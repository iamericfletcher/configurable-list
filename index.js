const addRowButton = document.getElementById('btn-add-row');
const submitButton = document.getElementById('btn-submit');
let formFieldFirstName = document.getElementById('form-field-first-name');
let formFieldLastName = document.getElementById('form-field-last-name');
let formFieldTitle = document.getElementById('form-field-title');
let formFieldAffiliation = document.getElementById('form-field-affiliation');
let formFieldEmail = document.getElementById('form-field-email');
let formTable = document.getElementById('form-table');
const addRowButtonContainer = document.getElementById('btn-add-row-container');
// Global variable for counting form sections. This ensures each new section has a unique identifier.
let formCounter = 1;


// Submit button handling
submitButton.addEventListener('click', () => {
    // Create an empty object to store the form data
    const data = {};
    const allChildren = original.parentNode.children;
    console.log(allChildren);
    // iterate through all children of the form and build data object with First Name, Last Name, Title, Affiliation, and Email values provided within each input field
    for (let i = 0; i < allChildren.length; i++) {
        const child = allChildren[i];
        // console.log(child);
        // Iterate over each child
        for (let j = 0; j < child.children.length; j++) {
            const labelChild = child.children[j];
            for (let k = 0; k < labelChild.children.length; k++) {
                const inputChild = labelChild.children[k];
                if (inputChild.tagName === 'INPUT') {
                    data[inputChild.id] = inputChild.value;
                }
            }
        }
    }
    // console.log(data);
    updateTable(data);
})

function updateTable(data) {
    for (let i = 0; i < Object.keys(data).length; i++) {}

}

// Add row handling
addRowButton.addEventListener('click', () => {
    duplicate();
})


const original = document.getElementById('form-fields');
function duplicate() {
    // Create a deep copy of the original form section
    const clone = original.cloneNode(true);

    // Assign a unique ID to the cloned form section by appending the formCounter
    clone.id = "form-fields-" + formCounter;

    // Iterate over each child of the cloned section
    for (let i = 0; i < clone.children.length; i++) {
        const child = clone.children[i];

        // Iterate over each child
        for (let j = 0; j < child.children.length; j++) {
            const labelChild = child.children[j];
            // Clear the input value of the cloned child
            labelChild.value = '';
            // Check if the child is an input field
            if (labelChild.tagName === 'INPUT') {
                // Modify the ID of the input to make it unique by appending the formCounter
                labelChild.id = labelChild.id + '-' + formCounter;
            }
        }
    }

    // Insert the cloned section just before the "Add Row" button container
    original.parentNode.insertBefore(clone, addRowButtonContainer);

    // Increment the counter for the next time we clone a section
    formCounter++;
}