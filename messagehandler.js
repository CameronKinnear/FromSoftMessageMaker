const templateButtons = document.querySelectorAll(".templatesButton");
const wordsButtons = document.querySelectorAll(".wordsButton");
const conjunctionButton = document.getElementById("conjunctionsButton");
const gesturesButton = document.getElementById("gesturesButton");

templateButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log("Templates button");
    })
});

wordsButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log("Words Button");
    })
}) 

conjunctionButton.addEventListener('click', () => {
    console.log("Conjunctions Button");
})

gesturesButton.addEventListener('click', () => {
    console.log("Gestures Button");
})