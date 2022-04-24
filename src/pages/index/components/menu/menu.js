(function () {
  const menuList = document.querySelector('#menuList')
  const menulis = menuList.querySelectorAll('li')
  const menuBoxes = document.querySelectorAll('.second-menu .menus-box')
  const menu = document.querySelector('#banner-menu')

  // 利用事件委托处理当鼠标经过li时，显示其二级菜单
  menuList.addEventListener('mouseover', function(e) {
    if (e.target.tagName.toLowerCase() === 'li') {
      const t = e.target.getAttribute('data-n')
      for (let i = 0; i < menulis.length; i++) {
        menulis[i].className = menulis[i].getAttribute('data-n')
      }
      e.target.className += ' current'

      // 找到二级菜单中匹配的项
      const theMenu = document.querySelector('.second-menu .menus-box[data-n=' + t +']')
      for (let i = 0; i < menuBoxes.length; i++) {
        menuBoxes[i].className = 'menus-box'
      }
      theMenu.className += ' current'
    }

    // 当鼠标离开菜单时，二级菜单隐藏
    menu.addEventListener('mouseleave', function(){
      for (let i = 0; i < menulis.length; i++) {
        menulis[i].className = menulis[i].getAttribute('data-n')
        menuBoxes[i].className = 'menus-box'
      }
  }, false)
  }, false)
})()