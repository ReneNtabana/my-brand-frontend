// var selectedRow = null;
// function onFormSubmit(){
//     event.preventDefault();
//     var formData = readFormData();
//     if(selectedRow === null){
//         insertNewRecord(formData);
//     }
//     else{
        
//     }
// }

// // Retriving the data
// function readFormData(){
//     var formData = {};
//     formData["authorInput"] = document.getElementById("blogId").value;
//     formData["authorInput"] = document.getElementById("authorsInput").value;
//     formData["titleInput"] = document.getElementById("titlesInput").value;
//     formData["bodyTextarea"] = document.getElementById("FormTextInput").value;
//     return formData;
// }

// //Inserting the Data
// function insertNewRecord(data){
//     var table = document.getElementById("blog-table").getElementsByTagName('tbody')[0];
//     var newRow = table.insertRow(table.length);

//     var cell1 = newRow.insertCell(0);
//         cell1.innerHTML = data.bodyId;
//     var cell2 = newRow.insertCell(1);
//         cell2.innerHTML = data.titleInput;
//     var cell3 = newRow.insertCell(2);
//         cell3.innerHTML = data.authorInput;
//     var cell4 = newRow.insertCell(3);
//         cell4.innerHTML = `<button>Edit</button> <button>Delete</button>`;    
        
// }

// const form = document.getElementById('dashboard-blog-form');
// const blogId = document.getElementById('blogId');
// const title = document.getElementById('titlesInput');
// const author = document.getElementById('authorsInput');
// const body = document.getElementById('FormTextInput');

// form.addEventListener('submit', e => {
//     e.preventDefault();

//     validateInputs();
// });

// const setError = (element, message) => {
//     const inputControl = element.parentElement;
//     const errorDisplay = inputControl.querySelector('.error');

//     errorDisplay.innerText = message;
//     inputControl.classList.add('error');
//     inputControl.classList.remove('success')
// }

// const setSuccess = element => {
//     const inputControl = element.parentElement;
//     const errorDisplay = inputControl.querySelector('.error');

//     errorDisplay.innerText = '';
//     inputControl.classList.add('success');
//     inputControl.classList.remove('error');
// };

// const validateInputs = () => {
//     const blogValue = blogId.value.trim();
//     const titleValue = title.value.trim();
//     const authorValue = author.value.trim();
//     const bodyValue = body.value.trim();

//     if(blogValue === '') {
//         setError(blogId, 'Input Blog Id ');
//     } else {
//         setSuccess(blogId);
//     }
//     if(authorValue === '') {
//         setError(author, 'Input Author name');
//     } else {
//         setSuccess(author);
//     }

//     if(titleValue === '') {
//         setError(title, 'Input Title');
//     } else {
//         setSuccess(title);
//     }

//     if(bodyValue === '') {
//         setError(body, 'Input Body');
//     } else {
//         setSuccess(body);
//     }

//     if(blogValue && authorValue && titleValue && bodyValue){
//         return true;
//     } else {
//         return false;
//     }
// };

var newBlog = document.querySelector("#newBlog");
var modal = document.querySelector(".modal");
var closeBtn = document.querySelector(".close-icon");
newBlog.onclick = function(){
    modal.classList.add("active");
}
closeBtn.addEventListener("click",()=>{
    modal.classList.remove("active");
})

// start all global variables
var userData = [];
var form = document.querySelector("#newBlogForm");
var id = document.getElementById("blog-t-id");
var author = document.getElementById("blog-t-author");
var title = document.getElementById("blog-t-title");
var body = document.getElementById("blog-t-body");
var addBlog = document.querySelector("#add-blog-btn");
var imgUrl;

// end all global variables

// adding new blogs

addBlog.onclick = function(e){
    e.preventDefault();
    getDataFromLocal(); 
    newBlogData();
    newBlogForm.reset('');
    closeBtn.click();
}

// userData = JSON.parse(localStorage.getItem("userData"))
// console.log(userData);  

if(localStorage.getItem("userData") != null){
    userData = JSON.parse(localStorage.getItem("userData"));
}

function newBlogData(){
    userData.push({
        id: id.value,
        author: author.value,
        title: title.value,
        blogImage: imgUrl == undefined ? "images/ellipse 1.png" : imgUrl
    });
    var userString = JSON.stringify(userData);
    localStorage.setItem("userData",userString);
    swal("Good job!", "Blog created successfully!", "success");
}

// retreiving data from local storage
var tableData = document.querySelector("#blog-table");
const getDataFromLocal = () =>{
    tableData.innerHTML = "";
    userData.forEach((data,index)=>{
        tableData.innerHTML += `
        <tr index='${index}'>
        <td>${index+1}</td>
        <td>${data.id}</td>
        <td>${data.title}</td>
        <td><img src="${data.blogImage}" width="40" height="40"></td>
        <td>${data.author}</td>
        <td>
            <button id="edit-button" title="Edit" type="button"><i class="fa fa-eye"></i></button>
            <button class="delete-button" title="Delete" type="button"><i class="fa fa-trash"></i></button>
        </td>
    </tr>
        `;
    });
}

// .................................deleting blogs................................
var i;
var delBtn = document.querySelectorAll(".delete-button")
for (i=0;i<delBtn.length;i++){
    delBtn[i].onclick = function(){
        var tr= this.parentElement.parentElement;
        var id = tr.getAttribute("index");
        userData.splice(id,1);
        tr.remove();
    }
}
//................................uploading image.....................................
var blog_image = document.querySelector("#blog-image");
var uploadImage = document.querySelector("#upload-image");
uploadImage.onchange = function(){
    if(uploadImage.files[0].size <5000000){
        var fReader = new FileReader();
        fReader.onload = function(e){
            imgUrl=e.target.result;
            blog_image.src = imgUrl;
        }
        fReader.readAsDataURL(uploadImage.files[0]);

    }else{
        alert("File size is too long");
    }
}
