const selectionAreaCol1 = document.getElementById("selectionAreaCol1");
const selectionAreaCol2 = document.getElementById("selectionAreaCol2");


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
    const finalText = toUnderscore.replaceAll(" ", "_");
    lineGesture = "Gestures/" + finalText + ".png";
    console.log(lineGesture);
}

async function GetGestureFileName(text) {
    const toLower = text.toLowerCase();
    const toUnderscore = toLower.replace(/[^\w\s]|_/g, "");
    const finalText = toUnderscore.replaceAll(" ", "_")
    return finalText;
}


//
// Set text for selected button
//
async function SetButtonText(text) {
    currentSelection.innerHTML = text;
}


//
// Catergory Buttons
//

// Constants for the category buttons
const templateButtons = document.querySelectorAll(".templatesButton");
const wordsButtons = document.querySelectorAll(".wordsButton");
const conjunctionButton = document.getElementById("conjunctionsButton");
const gesturesButton = document.getElementById("gesturesButton");
const selectedHeader = document.getElementById("selectedHeader");

templateButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectedHeader.innerText = "Templates";
        SetCurrentSelection(button);
        ChangeSelectionArea("Templates");
        SetSelectionAreaCol1("Templates");
    })
});

wordsButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectedHeader.innerText = "Words";
        SetCurrentSelection(button);
        ChangeSelectionArea("Words");
        SetSelectionAreaCol1("Words");
    })
}) 

conjunctionButton.addEventListener('click', () => {
    selectedHeader.innerText = "Conjunctions";
    SetCurrentSelection(conjunctionButton);
    ChangeSelectionArea("Conjunctions");
    SetSelectionAreaCol1("Conjunctions");
})

gesturesButton.addEventListener('click', () => {
    selectedHeader.innerText = "Gestures";
    SetCurrentSelection(gesturesButton);
    ChangeSelectionArea("Gestures");
    SetSelectionAreaCol1("Gestures");
})


//
// FIll in area functions
// REFACTOR BRUH
async function SetSelectionAreaCol1(textType) {

    // Reset for new buttons
    RemoveButtons();
    RemoveButtonsCol2();

    // Get data from file
    const response = await fetch(textType + ".txt")
    const rawData = await response.text();
    const data = await rawData.split("\n");

    // Fill in buttons
    for (const text of data) {
        
        // Create a new button object
        const newButton = document.createElement('button');
        newButton.innerHTML = text;
        newButton.style.width = "auto"

        // Choose logic based on button pressed
        const renderLine = currentSelection.dataset.renderonline;

        // Template Button Selected
        if (textType == "Templates") {
            SetSearchBarVisibility(false);
            newButton.addEventListener('click', () => {
                SetButtonText(text);
                SetLineTemplate(renderLine, text);
                ReRenderMessage(renderLine);
            })
        }

        // Words Button Selected
        else if (textType == "Words") {
            SetSearchBarVisibility(false);
            newButton.addEventListener('click', () => {
                SetSearchBarVisibility(true);
                SetSelectionAreaCol2(text);
            })
        }

        // Conjunctions Button Selected
        else if (textType == "Conjunctions") {
            SetSearchBarVisibility(false);
            newButton.addEventListener('click', () => {
                SetButtonText(text);
                SetLineConjunction(text);
                ReRenderMessage(renderLine);
            })
        }

        // Gestures Button Selected
        else if (textType == "Gestures") {
            SetSearchBarVisibility(true);
            newButton.classList.add("searchable");
            newButton.style.width = "25%";
            newButton.innerHTML = "<img src=\"Gestures/" + await GetGestureFileName(text) + ".png\" width=\"100\" height=\"100\"><br>" + text;
            newButton.addEventListener('click', () => {
                SetButtonText(text);
                SetLineGesture(text);
                ReRenderMessage(renderLine);
            })
        }
        
        selectionAreaCol1.appendChild(newButton);
    }
}


async function SetSelectionAreaCol2(wordsType) {

    RemoveButtonsCol2();
    const response = await fetch("Words/" + wordsType + ".txt")
    const rawData = await response.text();
    const data = await rawData.split("\n");

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
        selectionAreaCol2.appendChild(newButton);
        
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
    line2Render.innerHTML = conjLine2 + " " + line2Template.trim().replaceAll("****", line2Word.trim());
    if (lineGesture != "") {
        gestureRender.src = lineGesture;
    }
}


//
// Sets the column width for different selections
//
async function ChangeSelectionArea(selectionType) {
    if (selectionType == "Templates" || selectionType == "Conjunctions") {
        console.log("temp or conj");
        selectionAreaCol1.style.width = "100%";
        selectionAreaCol2.style.width = "0%";
        selectionAreaCol1.style.flexDirection = "column";
    }
    else if (selectionType == "Words") {
        selectionAreaCol1.style.width = "50%";
        selectionAreaCol2.style.width = "50%";
        selectionAreaCol1.style.flexDirection = "column";
    }
    else if (selectionType == "Gestures") {
        selectionAreaCol1.style.width = "100%";
        selectionAreaCol2.style.width = "0%";
        selectionAreaCol1.style.flexDirection = "row";
        selectionAreaCol1.style.flexWrap = "wrap";
    }
}


//
// Remove the buttons from the fill in area
//
async function RemoveButtons() {
    const selectionAreaCol1 = document.getElementById("selectionAreaCol1");

    while (selectionAreaCol1.firstChild) {
        selectionAreaCol1.removeChild(selectionAreaCol1.firstChild);
    }
}

async function RemoveButtonsCol2() {
    const selectionAreaCol1Col2 = document.getElementById("selectionAreaCol2");

    while (selectionAreaCol1Col2.firstChild) {
        selectionAreaCol1Col2.removeChild(selectionAreaCol1Col2.firstChild);
    }
}

async function filterSelectionArea() {
  const wordsQuery = document.getElementById('selectionSearch').value.toLowerCase();
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
    const inputField = document.getElementById("selectionSearch");
    if (visibility == true) {
        inputField.style.visibility = "visible"
    }
    else {
        inputField.style.visibility = "hidden";
    }
}
