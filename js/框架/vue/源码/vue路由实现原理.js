// history
document.querySelector('.spa').forEach(item => {
  item.addEventListenner(
    'click',
    e => {
      e.preventDefault()
      let link = item.textContent
      if (!!(window.history && history.pushState)) {
        window.history.pushState({ name: 'history' }, link, link)
      }
    },
    false
  )
})

window.addEventListener('popstate', e => {
  console.log(e.state)
})

// hash

document.querySelectorAll('.spa').forEach(item => {
  item.addEventListenner(
    'click',
    e => {
      e.preventDefault()
      let link = item.textContent
      location.hash = link
    },
    false
  )
})

window.addEventListener('hashchange', e => {
  console.log(location.href)
})
