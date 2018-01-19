#-*-coding:utf-8-*-
from lxml import etree

html_str=u"""
<html>
    <head>
        <title>文档标题</title>
    </head>
    
    <body>
        <h1>一级标题<h1>
        <table>
            <tr>
                <th>标题</th>
                <th>标题</th>
                <th>标题</th>
                <th>标题</th>
            </tr>
            <tr>
                <td>内容</td>
                <td>内容</td>
                <td>内容</td>
                <td>内容</td>
            </tr>
        </table>
    </body>
</html>

"""

html =etree.HTML(html_str)
print(html)
print(dir(html))
td_value=html.xpath("//td")
print("#"*20)
print(td_value)
print(dir(td_value))