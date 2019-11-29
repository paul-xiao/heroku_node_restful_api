const News = require('../models/News');
const cheerio = require('cheerio')
const axios = require('axios')
const puppeteer = require('puppeteer')

exports.crawlNews = (req, res) => {
    // async function main() {
    //     const resp = await axios.get('https://juejin.im/')
    //     res.send(resp.data)
        
    // }
    
    // main()
    (async () => {
        const browser = await puppeteer.launch({
            headless: true,
            executablePath:'/usr/bin/google-chrome',
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await page.goto('https://juejin.im/timeline/frontend');
       
        // Get the "viewport" of the page, as reported by the page.
        const dimensions = await page.evaluate(() => {
          return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio
          };
        });
       
        console.log('Dimensions:', dimensions);
       
        await browser.close();
      })();
}