const input = document.querySelector('#favchap');
const button = document.querySelector('#addButton');
const list = document.querySelector('#list');

const li = document.createElement('li');
const deleteButton = document.createElement('button');

li.textContent = "Alma";

deleteButton.textContent = '❌';

li.append(deleteButton);
list.appendChild(li);