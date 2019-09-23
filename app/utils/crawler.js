const Crawler = require('crawler')

const c = new Crawler({
    maxConnections : 10,
    // 这个回调每个爬取到的页面都会触发
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $默认使用Cheerio
            // 这是为服务端设计的轻量级jQuery核心实现
            console.log($("title").text());
        }
        done();
    }
})

module.exports = c