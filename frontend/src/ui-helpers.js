export function showError(element, error) {
    element.innerHTML = '';
    const p = document.createElement('p');
    p.textContent = error.message;
    p.style.color = 'red';
    element.appendChild(p);
}


const show = (el) => el.classList.remove("hidden");
const hide = (el) => el.classList.add("hidden");


export function toggle(element) {
    (element.classList.contains("hidden")) ? show(element) : hide(element);
}

