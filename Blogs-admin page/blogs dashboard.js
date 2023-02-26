var selectedRow = null;
function onFormSubmit(){
    event.preventDefault();
    var formData = readFormData();
    if(selectedRow === null){
        insertNewRecord(formData);
    }
    else{
        
    }
}

// Retriving the data
function readFormData(){
    var formData = {};
    formData["authorInput"] = document.getElementById("blogId").value;
    formData["authorInput"] = document.getElementById("authorInput").value;
    formData["titleInput"] = document.getElementById("titleInput").value;
    formData["bodyTextarea"] = document.getElementById("FormTextInput").value;
    return formData;
}

//Inserting the Data
function insertNewRecord(data){
    var table = document.getElementById("blog-table").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);

    var cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.bodyId;
    var cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.titleInput;
    var cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.authorInput;
    var cell4 = newRow.insertCell(3);
        cell4.innerHTML = `<button>Edit</button> <button>Delete</button>`;    
        
}

const form = document.getElementById('dashboard-blog-form');
const blogId = document.getElementById('blogId');
const title = document.getElementById('titleInput');
const author = document.getElementById('authorInput');
const body = document.getElementById('FormTextInput');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const validateInputs = () => {
    const blogValue = blogId.value.trim();
    const titleValue = title.value.trim();
    const authorValue = author.value.trim();
    const bodyValue = body.value.trim();


    if(blogValue === '') {
        setError(blogId, 'Input Blog Id ');
    } else {
        setSuccess(blogId);
    }
    if(authorValue === '') {
        setError(author, 'Input Author name');
    } else {
        setSuccess(author);
    }

    if(titleValue === '') {
        setError(title, 'Input Title');
    } else {
        setSuccess(title);
    }

    if(bodyValue === '') {
        setError(body, 'Input Body');
    } else {
        setSuccess(body);
    }

    if(blogValue && authorValue && titleValue && bodyValue){
        return true;
    } else {
        return false;
    }
};

