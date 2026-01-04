// hero image optimisation
const initResponsiveTiles = () => {
  const tiles = document.querySelectorAll('.cloud-optimize')
  // Define the widths we want Cloudinary to generate
  const widths = [400, 800, 1200, 1600, 2000]

  tiles.forEach(img => {
    const originalSrc = img.getAttribute('src')
    if (!originalSrc || !originalSrc.includes('cloudinary.com')) return

    // 1. Helper to inject Cloudinary transformations
    const makeResponsive = (url, w) => {
      return url.replace('/upload/', `/upload/f_auto,q_auto,w_${w}/`)
    }

    // 2. Generate the srcset string
    const srcsetValues = widths.map(
      w => `${makeResponsive(originalSrc, w)} ${w}w`
    )
    img.srcset = srcsetValues.join(', ')

    // 3. Set the sizes attribute (Responsive Logic)
    // Mobile: 100vw | Tablet: 50vw | Desktop: 33vw
    img.sizes = '(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw'

    // 4. Optimize the Hover Image (if exists)
    const hoverSrc = img.getAttribute('data-hover')
    if (hoverSrc && hoverSrc.includes('cloudinary.com')) {
      // Pre-optimize the hover source so it's ready when the user hovers
      img.setAttribute('data-hover', makeResponsive(hoverSrc, 1200))
    }

    // 5. Performance best practices
    img.loading = 'lazy'
    img.decoding = 'async'
  })
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initResponsiveTiles)

// gallery image optimization
const optimizeCloudinaryImages = () => {
  const cloudImages = document.querySelectorAll('.cloud-img')
  const cloudName = 'dumon96kf' // Your Cloudinary cloud name
  const widths = [300, 600, 900, 1200, 1600, 2000]

  cloudImages.forEach(img => {
    const publicId = img.getAttribute('data-cloud-id')
    if (!publicId) return

    const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto`

    // 1. Generate srcset string
    const srcsetArray = widths.map(w => {
      return `${baseUrl},w_${w}/${publicId} ${w}w`
    })

    // 2. Apply to the image
    img.srcset = srcsetArray.join(', ')

    // 3. Set a default fallback src (for older browsers)
    img.src = `${baseUrl},w_800/${publicId}`

    // 4. Set the sizes attribute
    img.sizes = '(max-width: 768px) 100vw, 50vw'

    // 5. Performance defaults
    img.loading = 'lazy'
    img.decoding = 'async'
  })
}

// Run the function when the DOM is ready
document.addEventListener('DOMContentLoaded', optimizeCloudinaryImages)

// gallery video otimization
gsap.utils.toArray('video').forEach(video => {
  ScrollTrigger.create({
    trigger: video,
    start: 'top bottom', // When the top of the video hits the bottom of the screen
    onEnter: () => video.play(),
    onLeave: () => video.pause(),
    onEnterBack: () => video.play(),
    onLeaveBack: () => video.pause()
  })
})
