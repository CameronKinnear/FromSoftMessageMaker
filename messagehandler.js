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

    RemoveButtons();
    RemoveButtonsCol2();

    const response = await fetch(textType + ".txt")
    const rawData = await response.text();
    const data = await rawData.split("\n");

    const fillTextArea = document.getElementById("fillInText");
    for (const text of data) {
        const newButton = document.createElement('button');
        newButton.innerHTML = text;
        newButton.style.width = "auto"
        if (textType == "Words") {
            newButton.addEventListener('click', () => {
                GetFillInWords(text);
            });
        }
        fillTextArea.appendChild(newButton);
    }
}


async function GetFillInWords(wordsType) {

    RemoveButtonsCol2();
    
    const response = await fetch("Words/" + wordsType + ".txt")
    const rawData = await response.text();
    const data = await rawData.split("\n");

    const fillTextArea = document.getElementById("fillInTextCol2");
    for (const text of data) {
        const newButton = document.createElement('button');
        newButton.innerHTML = text;
        newButton.style.width = "auto"
        fillTextArea.appendChild(newButton);
    }
}


async function RemoveButtons() {
    const fillTextArea = document.getElementById("fillInText");

    while (fillTextArea.firstChild) {
        fillTextArea.removeChild(fillTextArea.firstChild);
    }
}

async function RemoveButtonsCol2() {
    const fillTextAreaCol2 = document.getElementById("fillInTextCol2");

    while (fillTextAreaCol2.firstChild) {
        fillTextAreaCol2.removeChild(fillTextAreaCol2.firstChild);
    }
}