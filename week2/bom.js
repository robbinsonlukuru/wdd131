const input = document.querySelector('#favchap');
const button = document.querySelector('#addButton');
const list = document.querySelector('#list');

console.log("JavaScript loaded");

button.addEventListener('click', function() {
    if (input.value.trim() === '') {
        input.focus();
        return;
    }

    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    li.textContent = input.value.trim();
    deleteButton.textContent = '❌';

    deleteButton.addEventListener('click', function() {
        list.removeChild(li);
        input.focus();
    });

    li.append(deleteButton);
    list.appendChild(li);

    input.value = '';
    input.focus();
});