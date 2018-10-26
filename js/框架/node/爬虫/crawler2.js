const http = require('http')
const puppeteer = require('puppeteer')
const fs = require('fs')
const URL = 'http://desk.zol.com.cn/meinv/1920x1080/'
const browser = puppeteer.launch({
  headless: false
})
browser.then(async browser => {
  const page = await browser.newPage()
  try {
    await page.goto(URL)
  } catch (e) {
    console.log('err', e)
  }
  const totalPage = await getPageNum(page)
  for (let i = 0; i < totalPage; i++) {
    let uri = `${URL+i}.html`
    try {
      console.log(`跳转第${i}页成功`)
      await page.goto(uri)
    } catch (e) {
      console.log(`跳转第${i}页失败`)
      console.log('err', e)
    }

    const itemsArr = await getTitleAndUrl(page)
    for (let j = 0; j < itemsArr.length; j++) {
      let directoryName = itemsArr[j].title
      try {
        fs.mkdirSync(`./images/${directoryName}`) //改成了同步操作
        /*
        page.goto will throw an error if:
        there`s an SSL error
        the timeout is exceeded during navigation
         */
        await page.goto(itemsArr[j].link)
        console.log(`下载第${i}页第${j}项成功`)
      } catch (e) {
        console.log('err', e)
        console.log(`下载第${i}页第${j}项失败`)
      }
      let imgInfo = await getImg(page)
      for (let k = 0; k < imgInfo.length; k++) {
        let {
          src,
          imgName
        } = imgInfo[k]
        let filename = `./images/${itemsArr[j].title}/${imgName}`
        await downloadImg(src, filename)
      }
    }
  }
})
let getPageNum = async page => {
  const numSelector = '.aBtn-item .allPic font'
  const pageSize = 15 // 每页有多少项
  let totalNum = await page.evaluate((numS) => {
    return document.querySelector(numS).innerHTMl
  }, numSelector)
  return Math.ceil(totalNum / pageSize)
}
let getTitleAndUrl = async page => {
  const listSelector = '.photo-list-padding'
  const linkSelector = '.pic'
  let itemsArr = await page.evaluate((...args) => {
    return Array.from(document.querySelectorAll(args[0])).map((item) => {
      let linkS = item.querySelector(args[1])
      let link = linkS.href.trim()
      let title = linkS.querySelector('span').innerHTML.replace(/<.+?>/gi, '')
      return {
        link,
        title
      }
    })
  }, listSelector, linkSelector)
  return itemsArr
}
let getImg = async page => {
  const imgSelector = '#showImg > li > a > img'
  let imgInfo = await page.evaluate((imgS) => {
    return Array.from(document.querySelectorAll(imgS)).map((item, index) => {
      let src = item.src
      src = src ? src : item.getAttribute('srcs')
      src = src.trim().replace('t_s144x90c5', 't_s960x600c5')
      let imgName = `${index+1}.jpg`
      return {
        src,
        imgName
      }
    })
  }, imgSelector)
  return imgInfo
}
let downloadImg = async(src, filename) => {
  await http.get(src, (res) => {
    res.setEncoding('binary')
    let imgData = ''
    res.on('data', (chunk) => {
      imgData += chunk
    })
    res.on('end', () => {
      fs.writeFileSync(filename, imgData, 'binary') //改成了同步
    })
    res.on('error', (e) => {
      console.log('err', e)
    })
  })
}
