const templateButtons = document.querySelectorAll(".templatesButton");
const wordsButtons = document.querySelectorAll(".wordsButton");
const conjunctionButton = document.getElementById("conjunctionsButton");
const gesturesButton = document.getElementById("gesturesButton");
const selectedHeader = document.getElementById("selectedHeader");

templateButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log("Templates button");
        selectedHeader.innerText = "Selected Id: " + button.id;
        GetFillInText("Templates");
    })
});

wordsButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log("Words Button");
        selectedHeader.innerText = "Selected Id: " + button.id;
        GetFillInText("Words");
    })
}) 

conjunctionButton.addEventListener('click', () => {
    console.log("Conjunctions Button");
    selectedHeader.innerText = "Selected Id: " + conjunctionButton.id;
    GetFillInText("Conjunctions");
})

gesturesButton.addEventListener('click', () => {
    console.log("Gestures Button");
    selectedHeader.innerText = "Selected Id: " + gesturesButton.id;
})

const fillInText = document.getElementById("fillInText")

async function GetFillInText(textType) {
    const response = await fetch(textType + ".txt")
    const rawData = await response.text();
    fillInText.innerHTML = rawData;
}