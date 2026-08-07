const templateButtons = document.querySelectorAll(".templatesButton");
const wordsButtons = document.querySelectorAll(".wordsButton");
const conjunctionButton = document.getElementById("conjunctionsButton");
const gesturesButton = document.getElementById("gesturesButton");
const selectedHeader = document.getElementById("selectedHeader");

const template1Render = document.getElementById("templates1Rendered");
const words1Render = document.getElementById("words1Rendered");
const conjunctionsRender = document.getElementById("conjunctionsRendered");
const templates2Render = document.getElementById("templates2Rendered");
const words2Render = document.getElementById("words2Rendered");
const gesturesRender = document.getElementById("gesturesRendered");

var currentSelection;

templateButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log("Templates button");
        selectedHeader.innerText = "Templates";
        SetSelection(button);
        SetFillInColumnsTo(1);
        GetFillInText("Templates");
    })
});

wordsButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log("Words Button");
        selectedHeader.innerText = "Words";
        SetSelection(button);
        SetFillInColumnsTo(2);
        GetFillInText("Words");
    })
}) 

conjunctionButton.addEventListener('click', () => {
    console.log("Conjunctions Button");
    selectedHeader.innerText = "Conjunctions";
    SetSelection(conjunctionButton);
    SetFillInColumnsTo(1);
    GetFillInText("Conjunctions");
})

gesturesButton.addEventListener('click', () => {
    console.log("Gestures Button");
    selectedHeader.innerText = "Gestures";
    SetSelection(gesturesButton);
    SetFillInColumnsTo(1);
    GetFillInText("Gestures");
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
        else {
            newButton.addEventListener('click', () => {
                SetButtonText(newButton.innerHTML);
            })
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
        newButton.addEventListener('click', () => {
            SetButtonText(newButton.innerHTML);
        })
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

async function SetButtonText(text) {
    currentSelection.innerHTML = text;
}

async function SetRenderText(text) {

}

async function SetSelection(selection) {
    currentSelection = selection;
    return currentSelection;
}

// Accepts an input of 1 or 2
const col1 = document.getElementById("fillInText");
const col2 = document.getElementById("fillInTextCol2");
async function SetFillInColumnsTo(num) {
    if (num == 2) {
        col1.style.width = "50%";
        col2.style.width = "50%";
    }
    else {
        col1.style.width = "100%";
        col2.style.width = "0%";
    }


}