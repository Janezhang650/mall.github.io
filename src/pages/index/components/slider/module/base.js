import { ELEMENT_NODE_TYPE, SLIDER_ANIMATION_CLASS_NAME } from "./constants";
import DEFAULTS from "./defaults";

class BaseSlider {
  constructor(el, options) {
    if (el.nodeType !== ELEMENT_NODE_TYPE) {
      throw new Error('请传入DOM元素进行实例化！')
    }

    // 实际参数
    this.options = { ...DEFAULTS, ...options }

    const sliderEl = el
    const sliderContentEl = sliderEl.querySelector('.slider-content')
    const sliderItemEls = sliderContentEl.querySelectorAll('.slider-item')

    // 将获取到的参数添加到this上，方便在方法上使用
    this.sliderEl = sliderEl
    this.sliderContentEl = sliderContentEl
    this.sliderItemEls = sliderItemEls

    // 设置图片索引值
    this.minIndex = 0
    this.maxIndex = sliderItemEls.length - 1
    this.currentIndex = this.getCorrectedIndex(this.options.initialIndex)

    // 获取slider-item的宽度（即每次移动的距离）
    this.itemWidth = sliderItemEls[0].offsetWidth

    this.init()
  }

  // 初始化
  init () {
    // 为每个 slider-item 设置宽度
    this.setItemsWidth()

    // 为slider-content 设置宽度
    this.setContentWidth()

    // 切换到初始索引 initialIndex
    this.move(this.getDitance())

    // 开启动画
    if (this.options.animation) {
      this.openAnimation()
    }

    // 自动切换
    if (this.options.autoplay) {
      this.autoplay()
    }
  }

  // 自动切换
  autoplay () {
    const { autoplay } = this.options
    if (this.options.autoplay <= 0) return

    this.pause()
    this.autoplayTimer = setInterval(() => {
      this.next()
    }, autoplay)
  }

  // 切换到index索引对应的幻灯片
  to (index) {
    index = this.getCorrectedIndex(index)
    // 如果传入的是当前索引，说明不需要切换
    if (this.currentIndex === index) return

    // 获取移动的距离
    this.currentIndex = index
    const distance = this.getDitance()

    if (this.options.animation) {
      this.moveWithAnimation(distance)
    } else {
      this.move(distance)
    }
  }

  // 暂停自动切换
  pause () {
    clearInterval(this.autoplayTimer)
  }

  // 切换上一张
  prev () {
    this.to(this.currentIndex - 1)
  }

  // 切换下一张
  next () {
    this.to(this.currentIndex + 1)
  }

  // 开启动画
  openAnimation () {
    this.sliderContentEl.classList.add(SLIDER_ANIMATION_CLASS_NAME)
  }

  // 关闭动画
  closeAnimation () {
    this.setAnimationSpeed(0)
  }

  // 设置切换动画速度
  setAnimationSpeed (speed = this.options.speed) {
   this.sliderContentEl.style.transitionDuration = `${speed}ms`
  }

  // 不带动画移动
  move (distance) {
    this.sliderContentEl.style.transform = 
    `translate3d(${ distance}px, 0px, 0px)`
  }

  // 带动画移动
  moveWithAnimation (distance) {
    this.setAnimationSpeed()
    this.move(distance)
    this.sliderContentEl.addEventListener('transitionend', () => {
      this.closeAnimation()
    }, false)
  }

  // 获取需要移动的距离
  getDitance (index = this.currentIndex) {
    return -this.itemWidth * index
  }

  // 为每个 slider-item 设置宽度
  setItemsWidth () {
    for (const item of this.sliderItemEls) {
      item.style.width = `${ this.itemWidth } px`
    }
  }

  // 为slider-content 设置宽度
  setContentWidth () {
    this.sliderContentEl.style.width = `${ this.itemWidth * this.sliderItemEls.length } px`
  }

  // 获取校正后的索引
  getCorrectedIndex (index) {
    // 当索引值小于最小索引时，因为轮播图是循环播放的，所以就将当前索引设置为最后一张图片的索引
    if (index < this.minIndex ) return this.maxIndex
    if (index > this.maxIndex ) return this.minIndex
    return index
  }
  
}

export default BaseSlider