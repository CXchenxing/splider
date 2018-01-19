from selenium import webdriver

browser = webdriver.PhantomJS()
browser.get('http://www.baidu.com/')
# browser.save_screenshot("baidu.png")
with open("baidu.html", "w") as f:
    f.write(browser.page_source.encode("utf-8"))
