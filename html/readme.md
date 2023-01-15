### Doctype作用？严格模式与混杂模式如何区分？它们有何意义?

`<!DOCTYPE>`声明叫做文件类型定义（DTD），声明的作用为了告诉浏览器该文件的类型。让浏览器解析器知道应该用哪个规范来解析文档。`<!DOCTYPE>`声明必须在 HTML 文档的第一行，这并不是一个 HTML 标签。

+ 严格模式：又称标准模式，是指浏览器按照 W3C 标准解析代码。
+ 混杂模式：又称怪异模式或兼容模式，是指浏览器用自己的方式解析代码。
+ `HTML5` 没有严格和混杂之分,所以`html5`只需要写`<!DOCTYPE html>`

区分不同模式的意义在于，不同模式下浏览器的解析规则不同，从而影响页面的渲染结果。严格模式下，浏览器会按照 W3C 标准解析代码，所以在严格模式下，浏览器会按照标准的方式解析代码，比如标签必须闭合，标签名必须小写等等。而混杂模式下，浏览器会按照自己的方式解析代码，所以在混杂模式下，浏览器会尽可能的解析代码，比如标签不需要闭合，标签名可以大写等等。

### 行内元素,块级元素, 空(void)元素


+ 行内元素:不会独占一行,可以和其他元素在一行上,如`<span>`,`<a>`,`<img>`等

+ 块级元素:会独占一行,如`<div>`,`<p>`,`<h1>`等

+ 空元素:没有内容的元素,如`<img>`,`<br>`,`<input>`,`<hr>`,`<link>`,`<meta>`等

### 页面导入样式时，使用link和@import有什么区别？

+ `link`属于`XHTML`标签，除了加载`CSS`外，还能用于定义`RSS`等其他事务；`@import`是`CSS2.1`提出的，只能用于加载`CSS`。
+ 页面被加载的时，`link`引用的`CSS`会同时被加载，而`@import`引用的`CSS`会等到页面被加载完再加载。
+ `import`是`CSS2.1`提出的语法，只有`IE5`才能识别，`@import`只在`IE5`中有效。
+ `link`是`XHTML`标签，无兼容问题，`@import`不是`CSS`标签，只有`IE5`才能识别，所以只能在`IE5`中使用。
+ `link`支持使用`Javascript`控制 DOM 去改变样式，而`@import`不支持。


### html5有哪些新特性、移除了那些元素？如何处理HTML5新标签的浏览器兼容问题？如何区分 HTML 和 HTML5？

+ 新增语义化标签：`header`、`nav`、`section`、`article`、`aside`、`footer`、`figure`、`figcaption`、`time`、`mark`、`audio`、`video`、`canvas`、`datalist`、`keygen`、`output`、`progress`、`meter`、`ruby`、`rt`、`rp`、`bdi`、`wbr`、`command`、`details`、`summary`、`menu`、`menuitem`、`dialog`、`source`、`track`、`embed`、`object`、`param`、`video`、`audio`、`canvas`、`svg`、`math`。
+ 新增表单控件：`calendar`、`date`、`time`、`email`、`url`、`search`、`tel`、`number`、`range`、`color`、`datalist`、`keygen`、`output`。
+ 新增API：`Application Cache`、`Geolocation`、`Web Workers`、`Web Sockets`、`Web Storage`、`Drag and Drop`、`Canvas`、`SVG`、`MathML`、`Microdata`。
+ 新增支持：`WebGL`、`WebRTC`、`Web Audio`、`Web Speech`、`Web Components`。
+ 新增多媒体：`video`、`audio`、`canvas`、`svg`、`math`。

+ 移除的元素：`basefont`、`big`、`center`、`font`、`s`、`strike`、`tt`、`u`。

+ 处理HTML5新标签的浏览器兼容问题：最简单的处理方式是直接把新标签的样式写在一个新建的`CSS`文件里，然后在页面的`head`里引用这个`CSS`文件。另一种处理方式是在页面的`head`里加入如下代码：
```html
    <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
```
在这段代码,`IE9`以下的浏览器会识别`IE`条件注释,并加载`html5.js`文件,加载后将会识别`HTML5`新标签,并为其添加默认的`CSS`样式。

+ 区分 HTML 和 HTML5：查看`Doctype`声明。

### HTML语义化的理解

+ 语义化代码就是使页面内容结构化，便于对浏览器、搜索引擎解析；
+ 使阅读源代码的人对代码的意义有一个清晰的认识，便于团队开发和维护；
+ 即使在没有样式CSS情况下也以一种文档格式显示，并且是容易阅读的。

ps: 语义化的意义不仅仅是为了开发者的开发与维护，还可以使得视力障碍者可以对网页内容进行较为清晰的阅读，这也是一份社会责任。

### HTML5的离线储存怎么使用，工作原理能不能解释一下？

+ 在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件
+ **原理：**`HTML5`的离线存储是基于一个新建的`.appcache`文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像cookie一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示
+ 页面头部像下面一样加入一个`<html manifest="demo.appcache">`的属性在`cache.manifest`文件的编写离线存储的资源在离线状态时，操作`window.applicationCache`进行需求实现

### cookies，sessionStorage 和 localStorage
+ `cookie`是网站为了标示用户身份而储存在用户本地终端上的数据（通常经过加密,通常前端不进行写操作）,使用`cookie`来存储数据，但是`cookie`有大小限制，而且每次发送`http`请求时，都会将`cookie`发送给服务器，所以不适合存储大量数据。
+ `sessionStorage`和`localStorage`是为了在本地“存储”数据而生的，可以将一些数据存储在本地，下次访问时可以从本地获取，而不必再次从服务器获取。`sessionStorage`的生命周期是在当前浏览器窗口关闭之前，而`localStorage`的生命周期是永久的，除非用户手动删除数据。
+ `sessionStorage`和`localStorage`的区别在于，前者的数据只有在同一个浏览器窗口的同一个页面才能访问到，而后者的数据可以在同源窗口的所有页面中访问到。

- 其他的存储方式还有`indexDB`，`webSQL`等，但是这些都是`HTML5`的规范，目前还没有被所有浏览器支持。

- 前端还可以操作的存储方式:
  * 在页面上储存数据，比如`<div id="div1" data="data">`，这样的数据在页面刷新后就会消失,优点是不需要服务器端的支持,存储大小没有限制，缺点是数据只能在页面中使用，不能跨页面使用
  * 在url上储存数据，比如`http://www.baidu.com?data=data`，这种存储方式需要对location对象进行操作，防止跳转,还存在安全问题，数据可以被看到，不能跨页面使用,存储大小有限制,只能存储少量且无意义的数据(或对数据进行加密)

### iframe有那些缺点
+ iframe会阻塞主页面的`onload`事件(在父页面加载完成后再给iframe添加`src`属性,可以解决这个问题)
+ 搜索引擎的检索程序无法解读这种页面，不利于`SEO`
+ iframe和主页面共享连接池，而浏览器对相同域名的连接有限制，所以会影响页面的并行加载
+ 浏览器的后退按钮不好使
+ 子页面的元素位置计算不准确(比如`offsetTop`)
+ 使用`JavaScript`操作子页面的`DOM`: `iframe.contentWindow.document`，这种方式不够优雅，而且会影响页面性能

### Label的作用是什么
`label`标签通过for="表单控件id"可以将文本与表单控件绑定，当用户点击文本时，可以自动聚焦到和文本绑定的表单控件上

### 关闭自动完成
`autocomplete="off"`，这个属性是`HTML5`的属性，目前还没有被所有浏览器支持

### 多页面之间的通信方式
+ `localsotrage`:`window.addEventListener('storage',function(e){})`
+ `webSocket`
+ `WebWorker`

