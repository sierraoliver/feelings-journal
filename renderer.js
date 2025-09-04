const current_feeling = "";
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