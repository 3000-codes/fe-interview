import {ref,watchEffect} from 'vue'
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
