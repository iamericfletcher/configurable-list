let inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
const addRowButton = document.getElementById('btn-add-row');
const submitButton = document.getElementById('btn-submit');
// let formTable = document.getElementById('form-table');
let formTableHeader = document.getElementById('form-table-header');
let formTableBody = document.getElementById('form-table-body');
const addRowButtonContainer = document.getElementById('btn-add-row-container');
// Global variable for counting form sections. This ensures each new section has a unique identifier.
let formFieldGroupCount = 2;
// store the table headers to iterate through later to ensure we only add headers when needed beginning with the first header every time
const tableHeaders = ['Count', 'First-Name', 'Last-Name', 'Title', 'Affiliation', 'Email'];
// Create an empty object to store the form data
const data = {
    Count: 1,
};

// Utility function to check if all input fields are filled
function checkInputsFilled() {
    console.log('checkInputsFilled')
    inputs = document.querySelectorAll('input[type="text"], input[type="email"]'); // Re-query to capture new input fields
    let allFilled = true;

    inputs.forEach(i => {
        if (!i.value.trim()) {
            console.log('empty')
            allFilled = false;
        }
    });

    if (allFilled) {
        console.log('all filled')
        submitButton.removeAttribute('disabled');
        submitButton.classList.remove('cursor-not-allowed');
        submitButton.classList.remove('opacity-50');

        addRowButton.removeAttribute('disabled');
        addRowButton.classList.remove('cursor-not-allowed');
        addRowButton.classList.remove('opacity-50');
    } else {
        submitButton.setAttribute('disabled', 'true');
        submitButton.classList.add('cursor-not-allowed');
        submitButton.classList.add('opacity-50');

        addRowButton.setAttribute('disabled', 'true');
        addRowButton.classList.add('cursor-not-allowed');
        addRowButton.classList.add('opacity-50');
    }
}

// Attach event listeners to all input fields upon page load
inputs.forEach(input => {
    input.addEventListener('input', checkInputsFilled);
});

// on page load, focus the input field with id First-Name
document.getElementById('First-Name').focus();

// Attach event listener to the submit button
submitButton.addEventListener('click', () => {
    const allChildren = original.parentNode.children;
    // iterate through all children of the form and build data object with First Name, Last Name, Title, Affiliation, and Email values provided within each input field
    for (let i = 0; i < allChildren.length; i++) {
        const child = allChildren[i];
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
    updateTable(data);
    checkInputsFilled(); // Call the utility function after the submit button is clicked

})

// function to update the table with the data object
function updateTable(data) {
    // console.log(data)
    // const allChildren = original.parentNode.children;
    const newTableRow = document.createElement('tr');
    // console log all members of the data object
    console.log('object keys: ', Object.keys(data));
    console.log('formTableHeader.children: ', formTableHeader.children);
    // console.log('tableHeaders: ', tableHeaders);
    for (let i = 0; i < Object.keys(data).length; i++) {
        // console.log('Object.keys(data)[i]: ', Object.keys(data)[i]);
        let match = false;
        for (let j = 0; j < formTableHeader.children.length; j++) {
            // console.log('formTableHeader.children[j].innerText: ', formTableHeader.children[j].innerText);
            if (Object.keys(data)[i] === formTableHeader.children[j].innerText) {
                match = true;
                // console.log('match');
                const newTableData = document.createElement('td');
                const newTableDataContent = document.createTextNode(Object.values(data)[i].toString());
                newTableData.appendChild(newTableDataContent);
                newTableData.className = 'whitespace-nowrap px-6 py-4 border';
                newTableRow.appendChild(newTableData);
            }
        }
        if (!match) {
            // create new table headers
            const newTableHeader = document.createElement('th');
            const newTableHeaderContent = document.createTextNode(Object.keys(data)[i]);
            newTableHeader.appendChild(newTableHeaderContent);
            newTableHeader.className = 'px-6 py-4 border';
            newTableHeader.setAttribute('scope', 'col');
            formTableHeader.appendChild(newTableHeader);
            // create new table data
            const newTableData = document.createElement('td');
            const newTableDataContent = document.createTextNode(Object.values(data)[i].toString());
            newTableData.appendChild(newTableDataContent);
            newTableData.className = 'whitespace-nowrap px-6 py-4 border';
            newTableRow.appendChild(newTableData);
        }
    }
// Append the table row (tr) to the table body
    formTableBody.appendChild(newTableRow);
    clearState(data);
}

// function to clear the state of the form
function clearState(data) {
    const allChildren = original.parentNode.children;
    // remove all divs with ids starting with form-fields-
    for (let i = allChildren.length - 1; i >= 0; i--) {
        const child = allChildren[i];
        if (child.id.startsWith('form-fields-')) {
            child.remove();
        }
    }
    // clear the input fields
    for (let i = 0; i < allChildren.length; i++) {
        const child = allChildren[i];
        // Iterate over each child
        for (let j = 0; j < child.children.length; j++) {
            const labelChild = child.children[j];
            for (let k = 0; k < labelChild.children.length; k++) {
                const inputChild = labelChild.children[k];
                if (inputChild.tagName === 'INPUT') {
                    inputChild.value = '';
                }
            }
        }
    }
    // reset the data within the data object
    data.Count++;
    for (let i = Object.keys(data).length; i >= 0; i--) {
        // console.log(Object.keys(data)[i]);
        if (Object.keys(data)[i] !== 'Count') {
            delete data[Object.keys(data)[i]];
        }
    }
    formFieldGroupCount = 2;
    document.getElementById('First-Name').focus();
}

// Attach event listener to the add row button
addRowButton.addEventListener('click', () => {
    duplicate();
    checkInputsFilled();
})

const original = document.getElementById('form-fields');

// function to duplicate the form section
function duplicate() {
    // Create a deep copy of the original form section
    const clone = original.cloneNode(true);

    // Assign a unique ID to the cloned form section by appending the formCounter
    clone.id = "form-fields-" + formFieldGroupCount;

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
                labelChild.id = labelChild.id + '-' + formFieldGroupCount;
            }
        }
    }

    // Insert the cloned section just before the "Add Row" button container
    original.parentNode.insertBefore(clone, addRowButtonContainer);

    // re-attach the event listeners to the new input fields
    inputs = document.querySelectorAll('input[type="text"], input[type="email"]'); // Re-query to capture ALL input fields again
    inputs.forEach(input => {
        input.addEventListener('input', checkInputsFilled);
    });

    // Focus the input field with id First-Name-i where i is the formFieldGroupCount
    document.getElementById('First-Name-' + formFieldGroupCount).focus();

    // Increment the counter for the next time we clone a section
    formFieldGroupCount++;
}