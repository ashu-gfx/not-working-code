// Wrap in window.onload to ensure scrollWidth is calculated after images/styles load
window.onload = () => {
  const testimonials = [
    {
      text: "They're like digital magicians!",
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop'
    },
    {
      text: 'A total game-changer for us!',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop'
    },
    {
      text: "I can't stop recommending them.",
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop'
    },
    {
      text: 'Professional, creative, and timely.',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&h=100&auto=format&fit=crop'
    },
    {
      text: 'The best investment we made.',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&auto=format&fit=crop'
    }
  ]

  const marqueeTrack10 = document.getElementById('marqueeTrack10')
  if (!marqueeTrack10) return // Safety check

  const repeated = [...testimonials, ...testimonials]

  repeated.forEach(item => {
    const div = document.createElement('div')
    div.className = 'testimonial-item10'
    div.innerHTML = `
        <img src="${item.avatar}" class="testimonial-avatar10" />
        <span class="testimonial-text10">${item.text}</span>
      `
    marqueeTrack10.appendChild(div)
  })

  let x = 0
  const speed = 0.5
  let paused = false

  marqueeTrack10.addEventListener('mouseenter', () => (paused = true))
  marqueeTrack10.addEventListener('mouseleave', () => (paused = false))

  function animate () {
    if (!paused) {
      x -= speed
      // Use setProperty for better performance with smooth scrollers
      marqueeTrack10.style.setProperty('transform', `translateX(${x}px)`)

      // Reset position when half the track has passed
      if (Math.abs(x) >= marqueeTrack10.scrollWidth / 2) {
        x = 0
      }
    }
    requestAnimationFrame(animate)
  }

  animate()
}
