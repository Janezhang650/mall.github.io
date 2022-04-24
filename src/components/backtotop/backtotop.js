(function(){
  const backToTop = document.querySelector('#backToTop')

  let timer

  backToTop.addEventListener('click', function () {
    clearInterval(timer)

    timer = setInterval(function () {
      document.documentElement.scrollTop -= 100

      if (document.documentElement.scrollTop === 0) {
        clearInterval(timer)
      }
    }, 20)
  }, false)

  // 监听页面滚动事件
  window.addEventListener('scroll', function () {
    const scrollTop = document.documentElement.scrollTop || window.scrollY

    if (scrollTop >= 500) {
      backToTop.style.display = 'block'
    } else {
      backToTop.style.display = 'none'
    }
  }, false)
})()