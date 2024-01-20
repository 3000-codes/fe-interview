# JavaScript

JavaScript=ECMAScript+DOM+BOM

## dom

### 获取dom

| 方法 | 说明 |备注|
| --- | --- | --- |
| `dom.getElementByXx` | 在某个dom节点下，通过 `Xx` 获取单个元素 | `Xx` 可以是 `Id` |
| `dom.getElementsByXxx` | 在某个dom节点下，通过 `Xxx` 获取一组元素 | `Xxx` 可以是 `Name` ， `TagName` ， `ClassName` |
| `dom.querySelector` | 在某个dom节点下，通过 `css` 选择器获取单个元素 | 如果有多个元素符合条件，只返回第一个 |
| `dom.querySelectorAll` | 在某个dom节点下，通过 `css` 选择器获取一组元素 | |
| `document.documentElement` | 获取 `html` 元素 | |
| `document.body` | 获取 `body` 元素 | |
| `document.head` | 获取 `head` 元素 | |
| `dom.children` |获取子元素|不包括文本节点|
| `dom.childNodes` |获取子元素|包括文本节点|
| `dom.firstChild` |获取第一个子元素|不包括文本节点|
| `dom.lastChild` |获取最后一个子元素|不包括文本节点|
| `dom.firstElementChild` |获取第一个子元素|包括文本节点|
| `dom.lastElementChild` |获取最后一个子元素|包括文本节点|
| `dom.previousSibling` |获取前一个兄弟元素|不包括文本节点|
| `dom.nextSibling` |获取后一个兄弟元素|不包括文本节点|
| `dom.previousElementSibling` |获取前一个兄弟元素|包括文本节点|
| `dom.nextElementSibling` |获取后一个兄弟元素|包括文本节点|
| `dom.parentNode` |获取父元素|不包括文本节点|
| `dom.parentElement` |获取父元素|包括文本节点|
| `dom.contains` |判断是否包含某个元素|包括文本节点|

### 修改DOM结构dom

| 方法 | 说明 |备注|
| --- | --- | --- |
| `dom.appendChild` | 在某个dom节点下，添加一个子元素 | |
| `dom.insertBefore` | 在某个dom节点下，添加一个子元素 | |
| `dom.replaceChild` | 在某个dom节点下，替换一个子元素 | |
| `dom.removeChild` | 在某个dom节点下，删除一个子元素 | |
| `dom.cloneNode` | 在某个dom节点下，克隆一个子元素 | |
| `dom.remove` | 在某个dom节点下，删除自身 | |

### dom的尺寸与位置

* `Screen`对象，包含了有关用户屏幕的信息，如屏幕的宽高，可用的宽高，颜色深度等
* `outerWidth`和`outerHeight`，浏览器窗口本身的尺寸，包含浏览器菜单栏，工具栏，边框等
* `innerWidth`和`innerHeight`，浏览器窗口的内部尺寸，包含滚动条，不包含浏览器菜单栏，工具栏，边框等
* `document.documentElement.clientWidth`和`document.documentElement.clientHeight`，浏览器窗口的内部尺寸，包含滚动条，不包含浏览器菜单栏，工具栏，边框等
* `dom.clientWidth`和`dom.clientHeight`，元素的内部尺寸包含padding，不包含滚动条，边框，外边距等
* `dom.offsetWidth`和`dom.offsetHeight`，元素的外部尺寸包含padding，边框，不包含滚动条，外边距等
* `dom.scrollWidth`和`dom.scrollHeight`， `dom.scrollLeft`和`dom.scrollTop`
  + `dom.scrollTo(x,y)`，`dom.scrollTo(options)`: 滚动到指定位置
* `dom.getBoundingClientRect()`，获取元素的位置信息，返回一个`DOMRect`对象，包含`top`，`left`，`bottom`，`right`，`width`，`height`等属性

### 元素动画

* `dom.animate(keyframes, options)`，创建一个动画，`keyframes`是一个数组，每个元素是一个关键帧，`options`是一个配置对象，包含`duration`，`delay`，`iterations`，`direction`，`fill`，`easing`等属性
* `dom.getAnimations()`，获取元素上的所有动画

```js
const div = document.querySelector('div')
const animation = div.animate([{
        transform: 'translateX(0px)'
    },
    {
        transform: 'translateX(100px)'
    }
], {
    duration: 1000,
    iterations: Infinity
})
div.onclick = function() {
    if (animation.playState === 'paused') {
        animation.play()
    } else {
        animation.pause()
    }
}
```

## bom

### 事件

常用 `target.addEventListener(type, listener[, options]);` 或者 `target.onxxx=function(){}` 监听事件
* target：事件目标，可以是`window`，`document`，`dom`等
* type：事件类型，如`click`，`load`，`scroll`等
* listener：事件处理函数
* options：配置项，如`capture`，`once`，`passive`等

#### 移除监听

```js
// 方式一:同个type可以添加多个listener函数
target.addEventListener(type, listener[, options]);
target.removeEventListener(type, listener[, options]);

// 方式二：只能有一个listener函数
target.onxxx = function() {};
target.onxxx = null;

// 方式三
const ab = new AbortController();
target.addEventListener(type, listener, {
    signal: ab.signal
});
ab.abort();
```

#### 事件流

* 事件捕获阶段：事件从`window`开始，向下传递到目标元素
* 事件目标阶段：事件到达目标元素
* 事件冒泡阶段：事件从目标元素向上冒泡到`window`

#### 自定义事件

```js
var event = new Event('build');

// Listen for the event.
elem.addEventListener('build', function(e) {
    ...
}, false);

// Dispatch the event.
elem.dispatchEvent(event);
```

### 多页面之间的通信方式

* `localsotrage`:`window.addEventListener('storage',function(e){})`
* `webSocket`
* `WebWorker`

### cookies，sessionStorage 和 localStorage

* `cookie`是网站为了标示用户身份而储存在用户本地终端上的数据（通常经过加密, 通常前端不进行写操作）, 使用`cookie`来存储数据，但是`cookie`有大小限制，而且每次发送`http`请求时，都会将`cookie`发送给服务器，所以不适合存储大量数据。
* `sessionStorage`和`localStorage`是为了在本地“存储”数据而生的，可以将一些数据存储在本地，下次访问时可以从本地获取，而不必再次从服务器获取。`sessionStorage`的生命周期是在当前浏览器窗口关闭之前，而`localStorage`的生命周期是永久的，除非用户手动删除数据。
* `sessionStorage`和`localStorage`的区别在于，前者的数据只有在同一个浏览器窗口的同一个页面才能访问到，而后者的数据可以在同源窗口的所有页面中访问到。

* 其他的存储方式还有`indexDB`，`webSQL`等，但是这些都是`HTML5`的规范，目前还没有被所有浏览器支持。

### 可以延迟执行的方法

* `setTimeout`，延迟一段时间执行
* `setInterval`，每隔一段时间执行一次
* `setImmediate`，在下一次事件循环之前执行（node，IE10+）
* `requestAnimationFrame`，在下一次重绘之前执行
* `process.nextTick`，在当前事件循环之后执行（node）
* `MutationObserver`，监听DOM变化，每次DOM变化后执行
* `Promise`，`async/await`，在当前事件循环之后执行
* `while(true){}`，阻塞当前线程
* `alert`，`confirm`， `prompt`，阻塞当前线程
* `XMLHttpRequest`，阻塞当前线程
* `queueMicrotask`，在当前事件循环之后执行
* `requestIdleCallback`，在浏览器空闲时执行

微任务： `process.nextTick` ， `Promise` ， `MutationObserver` ， `queueMicrotask`

宏任务： `setTimeout` ， `setInterval` ， `setImmediate` ， `requestAnimationFrame`

## OOP

### 继承

```js
function Parent(name) {
    this.name = name
}

function Child(name, age) {
    Parent.call(this, name)
    this.age = age
}
inhert(Child, Parent)

// ES6
function inhert(child, parent) {
    Object.setPrototypeOf(child.prototype, parent.prototype)
}

// 圣杯模式
function inhert(child, parent) {
    var F = function() {}; // create a new temporary empty function
    F.prototype = Parent.prototype; // set the prototype of the temporary function to the parent's prototype
    Child.prototype = new F(); // set the child's prototype to a new instance of the temporary function
    Child.prototype.constructor = Child;
}
```
