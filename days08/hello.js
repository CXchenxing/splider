/**
 * Created by Xingxing on 2018/1/15.
 */

1 // a phantomjs example
2
var page = require('webpage').create();
3
phantom.outputEncoding = "gbk";
4
page.open("http://www.cnblogs.com/front-Thinking", function (status) {
    5
    if (status === "success") {
        6
        console.log(page.title);
        7
    } else {
        8
        console.log("Page failed to load.");
        9
    }
    10
    phantom.exit(0);
    11
});