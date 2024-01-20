### 如何获取页面中的所有元素

```js
// 通过API获取
document.getElementsByTagName('*')
document.querySelectorAll('*')

// 通过递归获取
function getAllElements() {
    const result = []
    getAllElementsFromNode(document)

    function getAllElementsFromNode(node) {
        if (node.nodeType === 1) { // 1: ELEMENT_NODE
            result.push(node)
        }

        const children = node.childNodes
        for (let i = 0; i < children.length; i++) {
            getAllElementsFromNode(children[i])
        }
    }
    return result
}
```

### Promise 的实现（模拟一个微任务）

```js
// Promise-> MutationObserver---> setImmediate---> setTimeout

function microTask(fn) {

    const observer = new MutationObserver(fn)
    const textNode = document.createTextNode('1')
    observer.observe(textNode, {
        characterData: true
    })
    textNode.data = '2'

}
```

### 如何清理所有的定时器

```js
// 1. clearTimeout和clearInterval共用一个队列，所以只需要清理一个即可 {@link [timers](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout-dev)}
// 2. 每次创建一个定时器，都会返回一个id，且id是递增的，所以可以通过最后一个id来清理所有的定时器

setTimeout(() => {}, 0)
setTimeout(() => {}, 0)
serInterval(() => {}, 100)
const lastId = setTimeout(() => {}, 0)
for (let i = 0; i <= lastId; i++) {
    clearTimeout(i)
}
```

### serInterval存在的问题

* 因为系统繁忙或者js主线程阻塞，可能会导致定时器的回调函数执行时间不准确
* 如果回调函数执行时间大于定时器的时间间隔，会导致回调函数连续执行多次
* 回调函数创建了一些不能被垃圾回收的对象，那么这些对象将会在每次执行时累积，可能导致内存泄漏
* 如果没有清理定时器，那么定时器会一直存在，浪费内存
