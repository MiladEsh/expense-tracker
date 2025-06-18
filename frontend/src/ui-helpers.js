export function showError(element, error) {
  element.innerHTML = '';
  const p = document.createElement('p');
  p.textContent = error.message;
  p.style.color = 'red';
  element.appendChild(p);
}