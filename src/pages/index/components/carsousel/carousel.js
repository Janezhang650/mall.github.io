(function () {
  const carousel = document.querySelector('#carousel')
  const leftBtn = document.querySelector('#leftBtn')
  const rightBtn = document.querySelector('#rightBtn')
  const banner = document.querySelector('#banner')
  const circles = document.querySelector('#circles')
  const lis = circles.querySelectorAll('li')

  const cloneLi = carousel.firstElementChild.cloneNode(true)
  carousel.appendChild(cloneLi)

  // 图片序号
  idx = 0

  // 节流锁
  lock = true

  // 自动轮播
  let timer = setInterval(function () {
    rightBtnHandler()
  }, 2000)

  // 当鼠标进入banner区域时，自动轮播暂停
  banner.onmouseenter = function () {
    clearInterval(timer)
  }

  // 当鼠标离开banner区域时，自动轮播继续
  banner.onmouseleave = function () {
    clearInterval(timer)
    timer = setInterval(rightBtnHandler, 2000)
  }

  function rightBtnHandler () {
    if (!lock) return
    lock = false

    // 动画
    carousel.style.transition = "transform 0.5s ease 0s"
    idx ++
    // 拉动
    carousel.style.transform = 'translateX(' + -idx * 16.66 + '%)'

    // 瞬间将假图片换成真的第一张
    if (idx > 4) {
      setTimeout(function () {
        // 取消动画
        carousel.style.transition = 'none'
        // 删除carousel的transform属性
        carousel.style.transform = 'none'
        // 图片换成第一张
        idx = 0
      }, 500)
    }

    // 给小圆点添加current类名
    setClassName()

    setTimeout(function() {
      lock = true
    }, 500)
  }

  rightBtn.addEventListener('click', rightBtnHandler, false)

  leftBtn.addEventListener('click', function () {
    if (!lock) return
    lock = false
  
    //  判断图片是否为第一张,如果为第一张时，要瞬间切换到假图，然后立马切换最后一张图
    if(idx === 0) {
      // 先取消动画
      carousel.style.transition = 'none'
      // 瞬间拉到假图
      carousel.style.transform = 'translateX(' + -5 * 16.66 + '%)'
      // 切换真图最后一张
      idx = 4
      // 瞬间换成换成最后一张
      setTimeout(function (){
        // 动画
        carousel.style.transition = 'transform .5s ease 0s'
        // transform 属性
        carousel.style.transform = 'translateX(' + -4 * 16.66 + '%)'
      }, 0)
    } else {
      idx --
      carousel.style.transition = 'transform .5s ease 0s'
      carousel.style.transform = 'translateX(' + -idx * 16.66 + '%)'
    }

    // 给小圆点添加current类名
    setClassName()
  
    setTimeout(function () {
      lock = true
    }, 500)
  }, false)

  // 借助事件冒泡处理小圆点点击事件,将点击的小圆点添加current类名
  circles.addEventListener('click', function(e) {
    if (e.target.tagName.toLowerCase() === 'li') {
      // 获取小圆点的data-n属性值
      let n = Number(e.target.getAttribute('data-n'))
      // 将图片设置为对应的序号
      idx = n
      // 图片移动
      carousel.style.transform = 'translateX(' + -idx * 16.66 + '%)'
    }

    // 给小圆点添加current类名
    setClassName()
  }, true)

  // 设置小圆点的类名
  function setClassName () {
    for (let i = 0; i < 5; i ++) {
      if (i === idx % 5) {
        lis[i].className = 'current'
      } else {
        lis[i].className = ''
      }
    }

  }
})()

