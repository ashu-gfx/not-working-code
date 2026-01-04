/**
 * LENIS SMOOTH SCROLL SETUP
 * Works with GSAP ScrollTrigger
 */

// 1. Initialize Lenis
const lenis = new Lenis({
  duration: 1.5, // Speed of the scroll (seconds)
  lerp: 0.08, // Linear interpolation (0.01 - 0.1) - lower is smoother/heavier
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing curve
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1, // Adjust scroll speed (e.g., 1.2 for faster)
  touchMultiplier: 2, // Sensitivity for touch devices
  infinite: false
})

// 2. Synchronize Lenis with GSAP ScrollTrigger
// This ensures ScrollTrigger markers update while the smooth scroll is active
lenis.on('scroll', ScrollTrigger.update)

// 3. Connect Lenis to the GSAP Ticker
// This is the most efficient way to run the requestAnimationFrame (raf)
gsap.ticker.add(time => {
  lenis.raf(time * 1000) // Convert seconds to milliseconds
})

// 4. Disable GSAP lag smoothing
// Crucial to prevent "stuttering" when GSAP tries to catch up with Lenis
gsap.ticker.lagSmoothing(0)

// 5. Optional: Handle internal anchor links (Smooth scroll to ID)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = this.getAttribute('href')

    lenis.scrollTo(target, {
      offset: -150, // Adjust this to match your header height
      duration: 1.5
    })
  })
})

// 6. Optional: Global Access
// Useful if you need to pause the scroll elsewhere (e.g., lenis.stop())
window.lenis = lenis

// // 1. Initialize Lenis
// const lenis = new Lenis({
//   duration: 1.2,
//   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Default easing
//   smoothWheel: true
// });

// // 2. Synchronize Lenis with GSAP ScrollTrigger
// lenis.on('scroll', ScrollTrigger.update);

// // 3. Add Lenis to GSAP's RequestAnimationFrame (ticker)
// gsap.ticker.add((time) => {
//   lenis.raf(time * 1000); // Convert seconds to milliseconds
// });

// // 4. Disable lag smoothing for smoother synchronization
// gsap.ticker.lagSmoothing(0);
