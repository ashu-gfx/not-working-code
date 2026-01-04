gsap.registerPlugin(TextPlugin)

function typeWritingAnimation () {
  const words = [
    'Designer.',
    'Developer.',
    'Designer.',
    'Developer.',
    'Designer.',
    'Developer.',
    'Designer.',
    'Developer.',
    'Designer.',
    'Developer.',
    'Designer.',
    'Developer.',
    'Designer.',
    'Developer.',
    'Designer.',
    'Developer.',
    'Designer.',
    'Developer.',
    'Designer.',
    'Developer.',
    'Designer.',
    'Developer.'
  ]
  const target = '.hero-title-secondary .text-inner'

  let tl = gsap.timeline({ repeat: -1 })

  words.forEach(word => {
    tl.to(target, {
      duration: 1.2,
      text: { value: word, delimiter: '' },
      ease: 'power1.inOut'
    }).to({}, { duration: 2 }) // Pause for reading

    // 2. DELETE (Improved Backspacing)
    tl.to(target, {
      duration: 0.6, // Faster than typing
      text: { value: '', delimiter: '', rtl: true },
      // "none" is smooth, but "stepped" feels like a keyboard
      ease: 'none'
    })
    // This will flip the order to ["Developer.", "Designer."]
  })
  //   words.reverse().forEach(word => {
  //     /* ... rest of your code ... */
  //     tl.to(target, {
  //       duration: 0.6, // Faster than typing
  //       text: { value: '', delimiter: '' },
  //       // "none" is smooth, but "stepped" feels like a keyboard
  //       ease: 'none'
  //     })
  //   })

  return tl
}
