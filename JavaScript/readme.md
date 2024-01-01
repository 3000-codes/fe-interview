# JavaScript

JavaScript=ECMAScript+DOM+BOM

## dom

## bom

### 多页面之间的通信方式
+ `localsotrage`:`window.addEventListener('storage',function(e){})`
+ `webSocket`
+ `WebWorker`


### cookies，sessionStorage 和 localStorage
+ `cookie`是网站为了标示用户身份而储存在用户本地终端上的数据（通常经过加密,通常前端不进行写操作）,使用`cookie`来存储数据，但是`cookie`有大小限制，而且每次发送`http`请求时，都会将`cookie`发送给服务器，所以不适合存储大量数据。
+ `sessionStorage`和`localStorage`是为了在本地“存储”数据而生的，可以将一些数据存储在本地，下次访问时可以从本地获取，而不必再次从服务器获取。`sessionStorage`的生命周期是在当前浏览器窗口关闭之前，而`localStorage`的生命周期是永久的，除非用户手动删除数据。
+ `sessionStorage`和`localStorage`的区别在于，前者的数据只有在同一个浏览器窗口的同一个页面才能访问到，而后者的数据可以在同源窗口的所有页面中访问到。

- 其他的存储方式还有`indexDB`，`webSQL`等，但是这些都是`HTML5`的规范，目前还没有被所有浏览器支持。


## OOP

### 继承

```js
function Parent(name){
    this.name=name
}

function Child(name,age){
    Parent.call(this,name)
    this.age=age
}
inhert(Child,Parent)

// ES6
function inhert(child,parent){
    Object.setPrototypeOf(child.prototype,parent.prototype)
}

// 圣杯模式
function inhert(child,parent){
    var F = function() {};  // create a new temporary empty function
    F.prototype = Parent.prototype;  // set the prototype of the temporary function to the parent's prototype
    Child.prototype = new F();  // set the child's prototype to a new instance of the temporary function
    Child.prototype.constructor = Child;
}

```