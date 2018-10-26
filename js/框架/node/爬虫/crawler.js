const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')
const rcp = require('request-promise-native')

const url = `http://m.cct58.com/`

const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time)
  })
;(async () => {
  console.log('开始了')
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false,
    slowMo: 200,
    devtools: false,
    headless: true
  })
  const page = await browser.newPage()

  try {
    await page.goto(url, {
      waitUntil: 'load',
      timeout: 15000
    })
  } catch (error) {
    console.log('error')
    await browser.close()
    return
  }

  await page.waitForSelector('.my_nav')

  // 热门
  await getPopular()
  // 排行榜
  // await getBeautyList()

  await browser.close()

  /**
   * 处理热门数据
   * */
  async function getPopular() {
    //存储爬取数据

    const list = await page.evaluate(() => {
      // 找到热门数据列表
      let itemList = Array.from(document.querySelectorAll('.my_zxtj ul li'))
      return itemList.map(item => {
        let link = item.querySelector('a')
        let img = item.querySelector('a>.img>img')
        let title = item.querySelector('a>p')
        return {
          target: link.href,
          imgurl: img.src,
          name: title.innerText
        }
      })
    })
    await fnSecondaryList(list)
  }

  async function fnSecondaryList(data) {
    data.map(item => {
      console.log(1)
      const sortOut = async () => {
        console.log(item.target)
        await sleep(2000)
        try {
          await page.goto(item.target, {
            waitUntil: 'load',
            timeout: 15000
          })
        } catch (error) {
          console.log('error')
          return
        }
        await page.waitForSelector('.tuijian')
        const list = await page.evaluate(() => {
          let itemList = Array.from(
            document.querySelectorAll('.tuijian .grid--images .grid-image-item')
          )
          return itemList.map(item => {
            let img = item.querySelector('a>img')
            return {
              imgurl: img.src
            }
          })
        })
        dbFuc(path.join(__filename, '../images'), list)
      }
      sortOut()
    })
  }

  /**
   * 处理排行榜数据
   * */
  async function getBeautyList() {
    //存储爬取数据
    const list = await page.evaluate(() => {
      const populars = []
      // 找到热门数据列表
      let itemList = document.querySelector('.my5_tj')
      let lis = itemList.querySelectorAll('ul>li')

      // 遍历数据列表
      for (let item of lis) {
        let popular = {
          target: '',
          imgurl: '',
          name: ''
        }

        // 找到每个热门的链接
        let link = item.querySelector('a')
        popular.target = link.href
        // 找到每个图片populars
        let img = item.querySelector('a>img')
        popular.imgurl = img.src
        // 找到图片标题
        popular.name = img.title
        populars.push(popular)
      }
      return populars
    })
    //dbFuc(path.join(__filename, '../images'), list)
  }

  /**
   * 下载图片
   */
  async function dbFuc(path, db) {
    for (let i in db) {
      await rcp({
        url: db[i].imgurl
      }).pipe(fs.createWriteStream(`${path}/${db[i].name}.png`))
      console.log(`下载成功`)
    }
  }
})()

/**
 * 判断文件或文件夹是否存在
 * @param  {string} path
 * @return {!Boolean | string}
 */
function isExist(path) {
  return new Promise((resolve, reject) => {
    if (!path) {
      throw new Error('path 不能为空')
      reject('path 不能为空')
    }
    fs.exists(path, exists => {
      if (exists) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}

/**
 * 删除文件夹
 */
function removeDir(src) {
  //  获取文件夹里的内容
  var arr = fs.readdirSync(src)
  console.log(arr)
  //  判断是否是文件，如果是文件删除；如果是文件夹在执行相同的过程
  for (var i = 0; i < arr.length; i++) {
    //    子文件的详细信息
    //    组装文件或者文件夹的路径
    var url = src + '/' + arr[i]
    var data = fs.statSync(url)
    // 判断每个元素是文件或者是文件夹
    if (data.isFile()) {
      fs.unlinkSync(url)
    } else {
      removeDir(url)
    }
  }
  // 删除空文件夹
  fs.rmdirSync(src)
}
