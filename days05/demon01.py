# coding:utf-8
import requests,re
#定义请求地址url
url="http://neihanshequ.com/joke/?is_json=1&app_name=neihanshequ_web&max_time=1515729764.0"
headers={
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36",
    "X-CSRFToken":"99d79d1c0199eff2b1d26e38d95f58ba",
}
num=0
while num<5:
    ###################1.爬取目标数据
    #向指定的url发送请求，获取数据
    response1 =requests.get(url,headers=headers)
    #打印展示
    content =response1.text
    #print(response1.text)
    ###2.正则表达式筛选数据
    joke_list=re.findall(r'"content": "(.*?)"',content)
    print(joke_list)
    ###3.存储数据
    f=open("joke1.txt","a")

    for joke in joke_list:
        print(joke.decode("unicode-escape"))
        f.write(joke.decode("unicode-escape").encode("utf-8"))
        f.write("\r\n###########\r\n")

    f.close()

    num+=1



