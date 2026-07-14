const input = document.querySelector('#favchap');
const button = document.querySelector('#addButton');
const list = document.querySelector('#list');
const feedback = document.querySelector('#feedback');

console.log("JavaScript loaded");


const validBooks = [
    '1 nephi', '2 nephi', 'jacob', 'enos', 'jarom', 'omni',
    'words of mormon', 'mosiah', 'alma', 'helaman',
    '3 nephi', '4 nephi', 'mormon', 'ether', 'moroni'
];


let addedChapters = [];

button.addEventListener('click', function() {
    let typedText = input.value.trim();

   
    if (typedText === '') {
        feedback.textContent = 'Please enter a book and chapter.';
        input.focus();
        return;
    }

    if (addedChapters.length >= 10) {
        feedback.textContent = 'You can only add up to 10 chapters.';
        input.focus();
        return;
    }


    let words = typedText.toLowerCase().split(' ');

    
    let chapterNumber = words[words.length - 1];

    let bookName = words.slice(0, words.length - 1).join(' ');

    let isNumber = !isNaN(chapterNumber) && chapterNumber !== '';
    let isValidBook = validBooks.includes(bookName);

    if (!isNumber || !isValidBook) {
        feedback.textContent = 'Please enter a valid book and chapter, like "Alma 5".';
        input.focus();
        return;
    }
    let bookWords = bookName.split(' ');
    let formattedBookWords = [];

    for (let i = 0; i < bookWords.length; i++) {
        let word = bookWords[i];
        let firstLetter = word.charAt(0).toUpperCase();
        let restOfWord = word.slice(1);
        formattedBookWords.push(firstLetter + restOfWord);
    }

    let formattedBook = formattedBookWords.join(' ');
    let formattedChapter = formattedBook + ' ' + chapterNumber;

    let alreadyAdded = addedChapters.includes(formattedChapter.toLowerCase());

    if (alreadyAdded) {
        feedback.textContent = formattedChapter + ' has already been added.';
        input.focus();
        return;
    }
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    li.textContent = formattedChapter + ' ';
    deleteButton.textContent = '❌';
    deleteButton.setAttribute('aria-label', 'Remove ' + formattedChapter);

    deleteButton.addEventListener('click', function() {
        list.removeChild(li);
        let index = addedChapters.indexOf(formattedChapter.toLowerCase());
        addedChapters.splice(index, 1);

        feedback.textContent = formattedChapter + ' removed.';
        input.focus();
    });

    li.append(deleteButton);
    list.appendChild(li);

    addedChapters.push(formattedChapter.toLowerCase());

    feedback.textContent = formattedChapter + ' added! (' + addedChapters.length + '/10)';

    input.value = '';
    input.focus();
});

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        button.click();
    }
});