const templateButtons = document.querySelectorAll(".templatesButton");
const wordsButtons = document.querySelectorAll(".wordsButton");
const conjunctionButton = document.getElementById("conjunctionsButton");
const gesturesButton = document.getElementById("gesturesButton");
const selectedHeader = document.getElementById("selectedHeader");

//
// Set and Get Current Selection
//
var currentSelection;
async function SetCurrentSelection(selection) {
    currentSelection = selection;
}


//
// Set data for renderer
//
var line1Template = "";
var line2Template = "";
var line1Word = "****";
var line2Word = "****"
var lineConjunction = "";
var lineGesture = ""
async function SetLineTemplate(renderLine, text) {
    if (renderLine == 1 ) {
        line1Template = text;
    }
    else {
        line2Template = text;
    }
}

async function SetLineWord(renderLine, text) {
    if (renderLine == 1 ) {
        line1Word = text;
    }
    else {
        line2Word = text;
    }
}

async function SetLineConjunction(text) {
    lineConjunction = text;
}

async function SetLineGesture(text) {
    const toLower = text.toLowerCase();
    const toUnderscore = toLower.replace(/[^\w\s]|_/g, "");
    const finalText = toUnderscore.replaceAll(" ", "_")
    lineGesture = "Gestures/" + finalText + ".png";
    console.log(lineGesture);
}

async function ConvertSelectionToGesture(selection) {
    
    console.log("After conversion " + finalText);
    return String(finalText);
}

//
// Set text for selected button
//
async function SetButtonText(text) {
    currentSelection.innerHTML = text;
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
        // Is searchable logic
        if (textType == "Gestures") {
            SetSearchBarVisibility(true);
            newButton.classList.add("searchable");
        }
        else {
            SetSearchBarVisibility(false);
        }

        // On click logic
        if (textType == "Words") {
            newButton.addEventListener('click', () => {
                SetSearchBarVisibility(true);
                GetFillInWords(text);
            });
        }
        else {
            newButton.addEventListener('click', () => {
                const renderLine = currentSelection.dataset.renderonline;
                SetButtonText(newButton.innerHTML);

                if (textType == "Templates") {
                    SetLineTemplate(renderLine, text);
                }
                else if (textType == "Conjunctions") {
                    SetLineConjunction(text);
                }
                else if (textType == "Gestures") {
                    SetLineGesture(text);
                }

                ReRenderMessage(renderLine);
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
        newButton.classList.add("searchable");
        newButton.addEventListener('click', () => {
            const renderLine = currentSelection.dataset.renderonline;
            SetButtonText(newButton.innerHTML);
            SetLineWord(renderLine, text);
            ReRenderMessage(renderLine);
        })
        fillTextArea.appendChild(newButton);
        
    }
}





//
// Update text on renderer
//
const line1Render = document.getElementById("line1Render");
const line2Render = document.getElementById("line2Render");
const gestureRender = document.getElementById("gestureRender");

async function ReRenderMessage(lineToReRender) {
    var conjLine1 = "";
    var conjLine2 = "";
    
    if (lineConjunction == ",") {
        conjLine1 = ",";
    }
    else {
        conjLine2 = lineConjunction;
    }

    line1Render.innerHTML = line1Template.trimEnd().replaceAll("****", line1Word.trimEnd()) + conjLine1;
    line2Render.innerHTML = conjLine2 + line2Template.trim().replaceAll("****", line2Word.trim());
    gestureRender.src = lineGesture;
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

async function filterFillIn() {
  const wordsQuery = document.getElementById('fillInSearch').value.toLowerCase();
  const words = document.querySelectorAll('.searchable');

  words.forEach(word => {
    // Get the text inside the current div
    const wordContent = word.textContent.toLowerCase();

    // 4. If the text matches the query, show it. Otherwise, hide it.
    if (wordContent.includes(wordsQuery)) {
      word.style.display = ""; // Restores default display (blocks/flex)
    } else {
      word.style.display = "none"; // Hides the element entirely
    }
  });
}

async function SetSearchBarVisibility(visibility) {
    const inputField = document.getElementById("fillInSearch");
    if (visibility == true) {
        inputField.style.visibility = "visible"
    }
    else {
        inputField.style.visibility = "hidden";
    }
}
