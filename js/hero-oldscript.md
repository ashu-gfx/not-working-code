 <script id="vertexShader" type="x-shader/x-vertex">
      varying vec2 v_uv;
      void main() {
        v_uv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    </script>

    <script id="fragmentShader" type="x-shader/x-fragment">
      uniform vec2 u_mouse;
      uniform vec2 u_res;
      uniform sampler2D u_image;
      uniform sampler2D u_imagehover;
      uniform float u_time;
      uniform float u_reveal;
      varying vec2 v_uv;

      // Simplex 3D Noise logic (Essential for the liquid effect)
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise3(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }

      float circle(in vec2 _st, in float _radius, in float blurriness){
        vec2 dist = _st;
        return 1.-smoothstep(_radius-(_radius*blurriness), _radius+(_radius*blurriness), dot(dist,dist)*4.0);
      }

      void main() {
        // REVEAL LOGIC: v_uv.y goes from 0 (bottom) to 1 (top)
        // Subtract 0.001 to ensure 0.0 is truly "off-screen"
        if (v_uv.y > u_reveal - 0.001) discard;

        // Use a default for PR if not defined
        float pixelRatio = 1.0;
        #ifdef PR
          pixelRatio = PR;
        #endif

        vec2 res = u_res * pixelRatio;
        vec2 st = gl_FragCoord.xy / res.xy - vec2(0.5);
        st.y *= u_res.y / u_res.x;

        vec2 mouse = u_mouse * 0.5;
        vec2 circlePos = st - mouse;

        float c = circle(circlePos, 0.15, 2.0) * 2.5;
        float offx = v_uv.x + sin(v_uv.y + u_time * .1);
        float offy = v_uv.y - u_time * 0.1 - cos(u_time * .001) * .01;
        float n = snoise3(vec3(offx, offy, u_time * .1) * 8.) - 1.;

        float finalMask = smoothstep(0.4, 0.5, n + pow(c, 2.));

        vec4 image = texture2D(u_image, v_uv);
        vec4 hover = texture2D(u_imagehover, v_uv);
        gl_FragColor = mix(image, hover, finalMask);
      }
    </script>

    <script>
      class Figure {
        constructor(scene, imageElement, index) {
          // Added index to track order
          this.$image = imageElement
          this.scene = scene
          this.loader = new THREE.TextureLoader()

          this.image = this.loader.load(this.$image.src)
          this.hover = this.loader.load(this.$image.dataset.hover)

          this.sizes = new THREE.Vector2(0, 0)
          this.offset = new THREE.Vector2(0, 0)
          this.mouse = new THREE.Vector2(0, 0)

          this.getSizes()
          this.createMesh()

          // SEQUENCE LOGIC:
          // If it's NOT the primary image, it's the back image.
          // Back image starts at 3s. Front image starts at 3.8s.
          const sequenceDelay = this.$image.dataset.type === 'primary' ? 5 : 4.2
          this.intro(sequenceDelay)

          window.addEventListener('mousemove', ev => this.onMouseMove(ev))
        }

        intro(delay) {
          // 1. Initial State
          this.uniforms.u_reveal.value = 0.0

          // 2. Animate reveal with the passed-in delay
          gsap.to(this.uniforms.u_reveal, {
            value: 1.0,
            duration: 2.0, // Slightly faster for snappier sequencing
            delay: delay,
            ease: 'expo.inOut'
          })

          // 3. Animate rotation
          const targetRotation =
            this.$image.dataset.type === 'primary'
              ? -9.54 * (Math.PI / 180)
              : 15 * (Math.PI / 180)

          this.mesh.rotation.z = 0
          gsap.to(this.mesh.rotation, {
            z: targetRotation,
            duration: 2,
            delay: delay + 0.2, // Rotates slightly after it starts growing
            ease: 'power2.out'
          })
        }

        getSizes() {
          const { width, height, top, left } =
            this.$image.getBoundingClientRect()
          this.sizes.set(width, height)
          this.offset.set(
            left - window.innerWidth / 2 + width / 2,
            -top + window.innerHeight / 2 - height / 2
          )
        }

        createMesh() {
          this.uniforms = {
            u_image: { value: this.image },
            u_imagehover: { value: this.hover },
            u_mouse: { value: this.mouse },
            u_time: { value: 0 },
            u_reveal: { value: 0.0 },
            u_res: {
              value: new THREE.Vector2(window.innerWidth, window.innerHeight)
            }
          }

          this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1)
          this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader:
              document.getElementById('fragmentShader').textContent,
            defines: { PR: window.devicePixelRatio.toFixed(1) },
            transparent: true
          })

          this.mesh = new THREE.Mesh(this.geometry, this.material)
          this.updateMeshScaleAndPosition()
          this.scene.add(this.mesh)
        }

        updateMeshScaleAndPosition() {
          this.getSizes()
          this.mesh.position.set(this.offset.x, this.offset.y, 0)
          this.mesh.scale.set(this.sizes.x, this.sizes.y, 1)
        }

        onMouseMove(event) {
          gsap.to(this.mouse, {
            duration: 0.5,
            x: (event.clientX / window.innerWidth) * 2 - 1,
            y: -(event.clientY / window.innerHeight) * 2 + 1
          })
        }

        update() {
          if (this.uniforms) this.uniforms.u_time.value += 0.01
        }
      }

      class Scene {
        constructor() {
          this.canvas = document.getElementById('stage')
          this.scene = new THREE.Scene()
          this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
          })

          this.renderer.setPixelRatio(window.devicePixelRatio)
          this.setSize()

          const perspective = 800
          const fov =
            (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) /
            Math.PI
          this.camera = new THREE.PerspectiveCamera(
            fov,
            window.innerWidth / window.innerHeight,
            1,
            1000
          )
          this.camera.position.set(0, 0, perspective)

          // Inside class Scene constructor
          this.figures = []
          const images = document.querySelectorAll(
            '.tile__image, .tile__image1'
          )

          images.forEach((img, index) => {
            // We pass the index now
            this.figures.push(new Figure(this.scene, img, index))
          })

          window.addEventListener('resize', () => this.onResize())
          this.update()
        }

        setSize() {
          this.renderer.setSize(window.innerWidth, window.innerHeight)
        }

        onResize() {
          this.setSize()
          this.camera.aspect = window.innerWidth / window.innerHeight
          this.camera.updateProjectionMatrix()
          this.figures.forEach(fig => {
            fig.updateMeshScaleAndPosition()
            fig.uniforms.u_res.value.set(window.innerWidth, window.innerHeight)
          })
        }

        update() {
          requestAnimationFrame(() => this.update())
          this.figures.forEach(fig => fig.update())
          this.renderer.render(this.scene, this.camera)
        }
      }

      new Scene()
    </script>
