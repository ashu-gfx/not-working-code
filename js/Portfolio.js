// Ensure the script runs after the HTML is loaded
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('portfolioGrid')
  const tabBtns = document.querySelectorAll('.tab-btn')

  // Fix: Your original array had a stray comma after the first item
  const portfolioItems = [
    {
      id: 'p1',
      title: 'MAGAZINE DESIGN',
      tab: 'Other-Design',
      category: 'Prints design Case Study',
      imageUrl:
        'https://res.cloudinary.com/dumon96kf/image/upload/v1767292180/p1_vomkzy.png',
      videoUrl:
        'https://res.cloudinary.com/dumon96kf/video/upload/v1767291734/p1_fuze5a.mp4',
      tags: ['Figma', 'Photoshop', 'Illustrator', 'Adobe Indesign'],
      link: 'https://www.behance.net/gallery/171929883/MAGAZINE-DESIGN-ADOBE-INDESIGN'
    },
    {
      id: 'p2',
      title: '3D Product Animation Commercial',
      category: 'Blender 3D',
      tab: '3D',
      imageUrl:
        'https://res.cloudinary.com/dumon96kf/image/upload/v1767292187/p2_adncpq.png',
      videoUrl:
        'https://res.cloudinary.com/dumon96kf/video/upload/v1767291704/p2_wrli6k.mp4',
      tags: ['Blender', 'Illustrator'],
      link: 'https://www.behance.net/gallery/174866289/3D-Bottle-Product-Animation-Commercial-Blender-3D'
    },
    {
      id: 'p3',
      title: '3D CAR Animated Landing Page',
      category: 'UI UX Case Study',
      tab: 'UI/UX',
      imageUrl:
        'https://res.cloudinary.com/dumon96kf/image/upload/v1767292179/p3_z7fld1.png',
      videoUrl:
        'https://res.cloudinary.com/dumon96kf/video/upload/v1767291705/p3_x9trul.mp4',
      tags: ['Figma', 'Photoshop', 'Illustrator', 'Spline'],
      link: 'https://www.behance.net/gallery/175133101/3D-CAR-Animated-Landing-Page-Design-Figma-Spline'
    },
    {
      id: 'p4',
      title: '3D CHARACTER HEAD MODELING',
      category: 'Blender 3D',
      tab: '3D',
      imageUrl:
        'https://res.cloudinary.com/dumon96kf/image/upload/v1767292181/p4_y51ecy.png',
      videoUrl:
        'https://res.cloudinary.com/dumon96kf/video/upload/v1767291743/p4_fwubwp.mp4',
      tags: ['Figma'],
      link: 'https://www.behance.net/gallery/174866475/3D-CHARACTER-HEAD-MODELING-BLENDER-3D'
    },
    {
      id: 'p5',
      title: '3d GLASS BOTTLE MODEL DESIGN',
      category: 'Blender 3D',
      tab: '3D',
      imageUrl:
        'https://res.cloudinary.com/dumon96kf/image/upload/v1767292178/p5_ied3nw.png',
      videoUrl:
        'https://res.cloudinary.com/dumon96kf/video/upload/v1767291782/p5_lkacjw.mp4',
      tags: ['Figma', 'Adobe dimension', 'Illustrator'],
      link: 'https://www.behance.net/gallery/171928137/3d-GLASS-BOTTLE-MODEL-DESIGN-ADOBE-DIMINSIONS'
    },
    {
      id: 'p6',
      title: 'FOOD DELIVERY APP',
      category: 'UI/UX DESIGN',
      tab: 'UI/UX',
      imageUrl:
        'https://res.cloudinary.com/dumon96kf/image/upload/v1767292184/p6_ktc82x.png',
      videoUrl:
        'https://res.cloudinary.com/dumon96kf/video/upload/v1767291675/food_app_UI_byixyk.mp4',
      tags: ['Figma'],
      link: 'https://www.behance.net/gallery/150570043/FOOD-DELIVERY-APP-UIUX-DESIGN'
    },
    {
      id: 'p7',
      title: 'SOCIAL MEDIA BANNER',
      category: 'GADGETS SOCIAL ADS',
      tab: 'Other-Design',
      imageUrl:
        'https://res.cloudinary.com/dumon96kf/image/upload/v1767295887/Group_28_mwhp4w.png',
      videoUrl: '',
      tags: ['Figma', 'Illustrator'],
      link: 'https://www.behance.net/gallery/169082269/SOCIAL-MEDIA-BANNER-%28GADGETS-SOCIAL-ADS%29'
    },
    {
      id: 'p8',
      title: 'Fly way',
      category: 'Travel Agency Website Design',
      tab: 'Other-Design',
      imageUrl:
        'https://res.cloudinary.com/dumon96kf/image/upload/v1767513995/p8_uhhiun.png',
      videoUrl:
        'https://res.cloudinary.com/dumon96kf/video/upload/v1767514071/My_Video_1_mctemu.mp4',
      tags: ['Figma'],
      link: 'https://www.behance.net/gallery/171929879/ILLUStRATOR-3D-PERFUME-BOTTLE-DESIGN'
    },
    {
      id: 'p9',
      title: 'Fly way',
      category: 'Travel Agency Website Design',
      tab: 'UI/UX',
      imageUrl:
        'https://res.cloudinary.com/dumon96kf/image/upload/v1767514304/p9_osj3jm.png',
      videoUrl: '',
      tags: ['Figma'],
      link: 'https://www.behance.net/gallery/152245045/E-commerce-website-design' // Added link
    },
    {
      id: 'p10',
      title: 'E-commerce Shoes Landing Page',
      category: 'Modern AI Inspired',
      tab: 'UI/UX',
      imageUrl:
        'https://res.cloudinary.com/dumon96kf/image/upload/v1767514834/p10_bnxqb8.png',
      videoUrl: '',
      tags: ['Figma'],
      link: 'https://www.behance.net/gallery/174869955/E-commerce-Shoes-Landing-Page-Modern-AI-Inspired' // Added link
    },
    {
      id: 'p11',
      title: 'Fly way',
      category: 'Travel Agency Website Design',
      tab: 'Other-Design',
      imageUrl:
        'https://res.cloudinary.com/dumon96kf/image/upload/v1767515018/p11_s1njsw.png',
      videoUrl: '',
      tags: ['Figma'],
      link: 'https://www.behance.net/gallery/152952073/Travels-logo-Branding-Design' // Added link
    },
    {
      id: 'p12',
      title: 'FIGMA HEADPHONE PROTOTYPING',
      category: 'Travel Agency Website Design',
      tab: 'UI/UX',
      imageUrl:
        'https://res.cloudinary.com/dumon96kf/image/upload/v1767515349/p12_yae1au.png',
      videoUrl: '',
      tags: ['Figma'],
      link: 'https://www.behance.net/gallery/171925489/FIGMA-HEADPHONE-PROTOTYPING' // Added link
    },
    {
      id: 'p13',
      title: 'Sundown studio Landing Page',
      category: 'Travel Agency Website Design',
      tab: 'Dev',
      imageUrl:
        'https://res.cloudinary.com/dumon96kf/image/upload/v1767860101/sundown_qubyho.png',
      videoUrl: '',
      tags: ['Figma'],
      link: 'https://ashu-gfx.github.io/Sundown-studio-website-gsap-1/' // Added link
    },
    {
      id: 'p14',
      title: 'DUO LANDING PAGE DESIGN',
      category: 'Travel Agency Website Design',
      tab: 'Dev',
      imageUrl:
        'https://res.cloudinary.com/dumon96kf/image/upload/v1767860099/DUO_w20gpa.png',
      videoUrl: '',
      tags: ['Figma'],
      link: 'https://ashu-gfx.github.io/PROJECT-3-DUO-main/' // Added link
    },
    {
      id: 'p15',
      title: 'Ray Ben Landing Page Design',
      category: 'Travel Agency Website Design',
      tab: 'Dev',
      imageUrl:
        'https://res.cloudinary.com/dumon96kf/image/upload/v1767860104/RAY-ben_vfaabu.png',
      videoUrl: '',
      tags: ['Figma'],
      link: 'https://ashu-gfx.github.io/RAY-BAN-REDESIGN-main/' // Added link
    },
    {
      id: 'p16',
      title: 'Rejoice Landing Page Design',
      category: 'Travel Agency Website Design',
      tab: 'Dev',
      imageUrl:
        'https://res.cloudinary.com/dumon96kf/image/upload/v1767860102/rejouice_vjynfl.png',
      videoUrl: '',
      tags: ['Figma'],
      link: 'https://ashu-gfx.github.io/Rejoice-website-clone-gsap/' // Added link
    },
    {
      id: 'p17',
      title: 'Image Trail Hover Effect',
      category: 'Travel Agency Website Design',
      tab: 'Dev',
      imageUrl:
        'https://res.cloudinary.com/dumon96kf/image/upload/v1767860102/image_trail_gtxwju.png',
      videoUrl: '',
      tags: ['Figma'],
      link: 'https://ashu-gfx.github.io/Imagetrail-popin-hovereffect-following-mouse/' // Added link
    },
    {
      id: 'p18',
      title: 'Image Tilt Effect',
      category: '',
      tab: 'Dev',
      imageUrl:
        'https://res.cloudinary.com/dumon96kf/image/upload/v1767860337/image-tilt_huymho.png',
      videoUrl: '',
      tags: ['Figma'],
      link: 'https://ashu-gfx.github.io/image-tilt-effect/' // Added link
    },
    {
      id: 'p19',
      title: 'Calm Creative Agency',
      category: '',
      tab: 'Dev',
      imageUrl:
        'https://res.cloudinary.com/dumon96kf/image/upload/v1767883836/calm_1_efxdds.png',
      videoUrl: '',
      tags: ['Figma'],
      link: 'https://20012511.github.io/calm/' // Added link
    },
    {
      id: 'p20',
      title: 'Finance Agency Landing Page',
      category: '',
      tab: 'Dev',
      imageUrl:
        'https://res.cloudinary.com/dumon96kf/image/upload/v1767883639/Finan-gfx_1_h0upjr.png',
      videoUrl: '',
      tags: ['Figma'],
      link: 'https://20012511.github.io/Finan-Gfx/' // Added link
    },
    {
      id: 'p21',
      title: 'Finance Agency Landing Page',
      category: '',
      tab: 'Dev',
      imageUrl:
        'https://res.cloudinary.com/dumon96kf/image/upload/v1767890713/Brick_yynv7y.png',
      videoUrl: '',
      tags: ['Figma'],
      link: 'https://20012511.github.io/brick/' // Added link
    }
  ]

  function renderPortfolio (filter = 'all') {
    grid.innerHTML = ''

    const filtered = portfolioItems.filter(
      item => filter === 'all' || item.tab === filter
    )

    filtered.forEach(item => {
      const div = document.createElement('div')
      div.className = 'portfolio-item'
      div.style.cursor = item.link ? 'pointer' : 'default'

      // --- VIDEO LOGIC ---
      const hasVideo = item.videoUrl && item.videoUrl.trim() !== ''
      let videoHTML = ''
      if (hasVideo) {
        const baseVideoPath = item.videoUrl.replace('.mp4', '')
        videoHTML = `
          <video class="portfolio-video" loop playsinline preload="metadata" muted>
            <source src="${baseVideoPath.replace(
              '/upload/',
              '/upload/f_mp4,q_auto,w_1280/'
            )}.mp4" type="video/mp4">
          </video>`
      }

      // --- IMAGE SRCSET ---
      const baseImgPath = item.imageUrl
      const imgOptions = 'f_auto,q_auto'
      const srcset = [300, 600, 900, 1200]
        .map(
          w =>
            `${baseImgPath.replace(
              '/upload/',
              `/upload/${imgOptions},w_${w}/`
            )} ${w}w`
        )
        .join(', ')

      div.innerHTML = `
        <div class="portfolio-image-box">
          ${
            hasVideo
              ? `
          <button class="sound-toggle" aria-label="Toggle Sound">
            <svg class="speaker-on" fill="currentColor" viewBox="0 0 24 24" style="display: none;"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
            <svg class="speaker-off" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.41.32-.85.59-1.32.82v2.05c1.02-.27 1.97-.74 2.8-1.39L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
          </button>`
              : ''
          }
          ${videoHTML}
          <img src="${baseImgPath.replace(
            '/upload/',
            `/upload/${imgOptions},w_800/`
          )}" 
               srcset="${srcset}" sizes="(max-width: 768px) 100vw, 33vw"
               alt="${item.title}" class="portfolio-img" loading="lazy" />
          <div class="tag-container">
            ${item.tags
              .map(tag => `<span class="badge2">${tag}</span>`)
              .join('')}
          </div>
        </div>
        <div class="portfolio-info">
          <div><h3 class="item-title">${
            item.title
          }</h3><p class="item-category">${item.category}</p></div>
          <div class="arrow-btn"><svg class="arrow-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14M13 5l7 7-7 7" /></svg></div>
        </div>`

      // --- REINSTATED HOVER & SOUND LOGIC ---
      const video = div.querySelector('.portfolio-video')
      const soundBtn = div.querySelector('.sound-toggle')
      const portfolioImg = div.querySelector('.portfolio-img')

      div.addEventListener('click', () => {
        if (item.link) window.open(item.link, '_blank')
      })

      if (hasVideo) {
        const onIcon = soundBtn.querySelector('.speaker-on')
        const offIcon = soundBtn.querySelector('.speaker-off')

        div.addEventListener('mouseenter', () => {
          video.play().catch(() => {})
          portfolioImg.style.opacity = '0'
        })

        div.addEventListener('mouseleave', () => {
          video.pause()
          video.currentTime = 0
          portfolioImg.style.opacity = '1'
        })

        soundBtn.addEventListener('click', e => {
          e.stopPropagation()
          video.muted = !video.muted
          onIcon.style.display = video.muted ? 'none' : 'block'
          offIcon.style.display = video.muted ? 'block' : 'none'
        })
      } else {
        div.addEventListener('mouseenter', () => {
          portfolioImg.style.transform = 'scale(1.05)'
        })
        div.addEventListener('mouseleave', () => {
          portfolioImg.style.transform = 'scale(1)'
        })
      }

      grid.appendChild(div)
    })
  }

  // --- TAB CLICK LISTENER ---
  // --- FIXED TAB CLICK LISTENER ---
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'))
      btn.classList.add('active')

      // FIX: Changed 'data-tab' to 'data-category' to match your HTML
      const selectedTab = btn.getAttribute('data-category')
      renderPortfolio(selectedTab)
    })
  })

  renderPortfolio() // Initial render
})
