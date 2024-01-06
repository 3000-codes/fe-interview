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
