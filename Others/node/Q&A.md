### 什么是简单请求

* 请求方法为以下三种方法之一：
  + HEAD
  + GET
  + POST
* HTTP头信息不超出以下几种（安全）字段：
    - Accept
    - Accept-Language
    - Content-Language
    - Last-Event-ID
    - Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
* 请求头中的Origin字段与当前页面的域名一致
