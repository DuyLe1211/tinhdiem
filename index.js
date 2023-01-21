

let rowElement = document.querySelector('.row');
let value;
rowElement.oninput = () => {
    value = rowElement.value;
}
let promise = new Promise((resolve) => {
    resolve()
})

export default output = promise.then(() => {return value});