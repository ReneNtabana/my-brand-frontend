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
var author= document.getElementById("blog-t-author");
var title = document.getElementById("blog-t-title");
var body = document.querySelector(".blog-t-body")
var addBlog = document.querySelector("#add-blog-btn");
var update = document.querySelector("#updateBlog")
var imgUrl;

// end all global variables

// adding new blogs

addBlog.onclick = function(e){
    e.preventDefault();
    getDataFromLocal(); 
    newBlogData(title, author, body);
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
            <button class="edit-button" title="Edit" type="button"><i class="fa fa-eye"></i>Edit</button>
            <button class="delete-button" title="Delete" type="submit"><i class="fa fa-trash"onclick="deleteBlog"></i>Delete</button>
        </td>
    </tr>
        `;
    });
}

// .................................deleting blogs................................
var i;
var delBtn = document.querySelectorAll(".delete-button");
for (i=0; i < delBtn. length;i++){
    delBtn[i].onclick = function(){
        var tr= this.parentElement.parentElement;
        var id = tr.getAttribute("index");
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Blog!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                userData.splice(id,1);
                localStorage.setItem("userData",JSON.stringify(userData));
                tr.remove();
              swal("Poof! Your Blog has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your Blog is safe!");
            }
          });
       
    }
}

//.................................updating blog....................................
var allEditBtn = document.querySelectorAll(".edit-button");
for( i = 0;i < allEditBtn.length;i++){
    allEditBtn[i].onclick = function(){
        var tr = this.parentElement.parentElement;
        var td = tr.getElementByTagName("TD");
        var index = tr.getAttribute("index");
        var imgTag = td[1].getElementByTagName("IMG");
        var blogImage = imgTag[0].src;
        var id = td[2].innerHTML;
        var author = td[3].innerHTML;
        var title = td[4].innerHTML;
        newBlog.click();
        addBlog.disabled = true; 
        update.disabled = false; 
        id.value = id;
        author.value = author;
        title.value = title;
        blog_image.src = blogImage; 
        update.onclick = function(e){
            userData[index] = {
                id: id.value,
                author: author.value,
                title: title.value,
                blogImage: uploadImage.value == "" ?blog_image.src : imgUrl
            }
            localStorage.setItem("userData",JSON.stringify(userData));
        }
        
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

//........................searching for blogs...............................
var searchEl = document.querySelector("#search-blog");
searchEl.oninput = function(){
    searchFuc();
}

function searchFuc(){
    var tr = tableData.querySelectorAll("TR");
    var filter = searchEl.value.toLowerCase();
    var i;
    for(i=0;i<tr.length;i++){
        var td = tr[i].getElementByTagName("TD")[2];
        var id = td.innerHTML;
        if(td.toLowerCase().indexOf(filter)> -1){
            tr[1].style.display = "";
        }else{
            tr[1].style.display = "none";
        }
    }
}

//.....................form validation...........................

var userData = [];
var form = document.querySelector("#newBlogForm");
var id = document.getElementById("blog-t-id");
var author= document.getElementById("blog-t-author");
var title = document.getElementById("blog-t-title");
var body = document.querySelector(".blog-t-body")
var addBlog = document.querySelector("#add-blog-btn");
var update = document.querySelector("#updateBlog")
var imgUrl;

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
    const titleValue = title.value.trim();
    const authorValue = author.value.trim();
    const bodyValue = body.value.trim();

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

    if(authorValue && titleValue && bodyValue){
        return true;
    } else {
        return false;
    }
};