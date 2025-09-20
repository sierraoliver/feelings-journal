let current_feeling = "";
const feelings = document.querySelectorAll('.feeling');

// Loop through and add click events
feelings.forEach(feeling => {
    feeling.addEventListener('click', () => {
        feelings.forEach(f => f.classList.remove('selected'));
         feeling.classList.add('selected');

        const color = feeling.getAttribute('data-color');
        document.body.style.backgroundColor = color;
        current_feeling = feeling.querySelector('p').textContent;
    });
});

const entry = document.getElementById('feel-text');
function addEntry(){
     let text = entry.value;

    if (text === "") return;
    if (current_feeling === "") return;

    window.journalAPI.saveEntry(current_feeling, text); 
    entry.value = "";
};
