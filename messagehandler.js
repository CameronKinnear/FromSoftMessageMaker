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

//
// Set and Get Current Selection
//
var currentSelection;
async function SetCurrentSelection(selection) {
    currentSelection = selection;
}


templateButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectedHeader.innerText = "Templates";
        SetCurrentSelection(button);
        SetFillInColumnsTo(1);
        GetFillInText("Templates");
    })
});

wordsButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectedHeader.innerText = "Words";
        SetCurrentSelection(button);
        SetFillInColumnsTo(2);
        GetFillInText("Words");
    })
}) 

conjunctionButton.addEventListener('click', () => {
    selectedHeader.innerText = "Conjunctions";
    SetCurrentSelection(conjunctionButton);
    SetFillInColumnsTo(1);
    GetFillInText("Conjunctions");
})

gesturesButton.addEventListener('click', () => {
    selectedHeader.innerText = "Gestures";
    SetCurrentSelection(gesturesButton);
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
                const renderLine = currentSelection.dataset.renderonline;
                SetButtonText(newButton.innerHTML);
                SetRenderText(renderLine, textType, text);
                if (textType == "Templates") {
                    SetLineTemplate(renderLine, text);
                }
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
            SetRenderText(currentSelection.dataset.renderonline, "Words", text);
        })
        fillTextArea.appendChild(newButton);
    }
}



async function SetButtonText(text) {
    currentSelection.innerHTML = text;
}


//
// Update text on renderer
//
const line1Render = document.getElementById("line1Render");
const line2Render = document.getElementById("line2Render");
async function SetRenderText(renderline, category, text) {
    if (category == "Templates") {
        if (renderline == 1) {
            line1Render.innerHTML = text;
        }
        else {
            line2Render.innerHTML = text;
        }
    }

    else if (category == "Words") {
        UpdateWordOnTemplate(renderline, text);
    }
}

async function UpdateWordOnTemplate(renderline, text) {
    if (renderline == 1) {
        const newText = line1Template.replaceAll("****", text);
        line1Render.innerHTML = newText;
    }
    else {
        const newText = line2Template.replaceAll("****", text);
        line2Render.innerHTML = newText;
    }
}



//
// Sets the column width for different selections
//
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


//
// Set and Get Line Templates
//
var line1Template;
var line2Tempalte;
async function SetLineTemplate(renderLine, text) {
    if (renderLine == 1 ) {
        line1Template = text;
    }
    else {
        line2Tempalte = text;
    }
}


//
// Remove the buttons from the fill in area
//
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