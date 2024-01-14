import { ref, watchEffect } from 'vue'
const app = document.querySelector('#app');

const ul = document.createElement('ul');
for (let i = 0; i < 2; i++) {
  const li = document.createElement('li');
  li.innerText = `Item ${i}`;
  ul.appendChild(li);
}
app!.appendChild(ul);

const count = ref(0);
const increment = () => count.value++;
const decrement = () => count.value--;

const btn = document.createElement('button');
btn.innerText = 'Remove Item';
btn.addEventListener('click', increment);
app!.appendChild(btn);

watchEffect(() => {
  const li = ul.querySelector('li:last-child') as HTMLLIElement;
  if (li) {
    li.style.color = 'red';
    li.innerText = `clicked ${count.value} times`;
  }
});

const delegates = (function () {
  const globalDelegates = [() => { }]

  Function.prototype.valueOf = function () {
    if (this.globalIndex !== undefined) return this.globalIndex
    const index = globalDelegates.length;
    Object.defineProperty(this, 'globalIndex', {
      get() {
        return index
      }
    })
    globalDelegates.push(this)
    return index
  }

  return function delegates() {
    const handlers = {}
    const callers = {}
    return new Proxy(
      {}, {
      get(target, p) {
        console.log(target, p);

        handlers[p] ??= []
        return callers[p] ??= function (...args) {
          handlers[p]?.forEach(x => x(...args))
        }
      },

      set(target, p, newValue) {
        console.log(target, p, newValue);

        const event = handlers[p] ??= [];
        switch (typeof newValue) {
          case 'function':
            event.push(newValue)
            return true;
          case 'number':
            const eventIndex = callers[p].valueOf();
            let index = Math.abs(newValue - eventIndex);
            const delegate = globalDelegates[index];
            if (delegate == null) return false;
            if (newValue > eventIndex) {
              handlers[p].push(delegate)
              return true;
            }
            else {
              handlers[p].splice(handlers[p].findIndex(x => x === delegate), 1)
              return true;
            }
        }
        return false;
      }
    })
  }
})()

// window.delegates = delegates;
// let d = delegates();

// d.a = true