import './slider.css'
import './button'

import Slider from './module'

const slider = new Slider(document.querySelector('.slider'), {
  initialIndex: 1,
  animation: true,
  speed: 500,
  autoplay: 0
})

// (function() {
//   const leftBtn = document.querySelector('#leftBtn')
//   const rightBtn = document.querySelector('#rightBtn')
//   const banner = document.querySelector('#banner')

//   leftBtn.addEventListener('click', () => {
//     slider.prev()
//   }, false)

//   rightBtn.addEventListener('click',() => {
//     slider.next()
//   })

//   banner.addEventListener('mouseenter', () => {
//     slider.pause()
//   }, false)

//   banner.addEventListener('mouseleave', () => {
//     slider.autoplay()
//   }, false)
// })()