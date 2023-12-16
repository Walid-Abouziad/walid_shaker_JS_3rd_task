var bookmarkNameInput = document.getElementById("bookmarkNameInput");
var websiteUrlInput = document.getElementById("websiteUrlInput");
var searchInput = document.getElementById("searchInput");
var updateBtn = document.getElementById("updateBtn");
var addBtn = document.getElementById("addBtn");
var indexUpdate = 0;
var bookMarkList =[];

if(localStorage.getItem("bookmarks") !=null){
    bookMarkList = JSON.parse(localStorage.getItem("bookmarks"));
    displayData()

}


function addBookmark(){
    if(validationName() == true  && validationUrl() == true){
        var bookmark = {
            name: bookmarkNameInput.value ,
            category: websiteUrlInput.value ,
        }
    
        bookMarkList.push(bookmark);
    
    
        localStorage.setItem("bookmarks",JSON.stringify(bookMarkList));
    
        clearForm();
    
        displayData();
    }
    
}


function clearForm (){
    bookmarkNameInput.value="";
    websiteUrlInput.value="";
}
function displayData(){

    var cartona = "";

    for( var i=0 ; i<bookMarkList.length  ; i++){
        cartona += ` <tr>
        <td>${i+1}</td>
        <td>${bookMarkList[i].name}</td>
        <td><a href="${bookMarkList[i].category}"><button class="btn btn-primary btn-sm px-3"><i class="fa-solid fa-eye me-2"></i>Visit</button></a></td>
        <td>
            <button class="btn btn-warning btn-sm" onclick="setData(${i})">Update</button>
            <button class="btn btn-danger btn-sm ms-2" onclick="deleteProduct(${i})">Delete</button>
        </td>
    </tr>`
    }

    document.getElementById("tableBody").innerHTML = cartona;

}


function deleteProduct(elementNumber){
    bookMarkList.splice(elementNumber,1);
    localStorage.setItem("bookmarks",JSON.stringify(bookMarkList));
    displayData();
}

function searchBookmark(){
    var term =searchInput.value;
    var cartona = "";

    for( var i=0 ; i<bookMarkList.length  ; i++){
        if(bookMarkList[i].name.toLowerCase().includes(term.toLowerCase())){
            cartona += ` <tr>
            <td>${i+1}</td>
            <td>${bookMarkList[i].name}</td>
            <td><a href="${bookMarkList[i].category}"><button class="btn btn-primary btn-sm px-3"><i class="fa-solid fa-eye me-2"></i>Visit</button></a></td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="setData(${i})">Update</button>
                <button class="btn btn-danger btn-sm ms-2" onclick="deleteProduct(${i})">Delete</button>
            </td>
        </tr>`
    }    
}
    document.getElementById("tableBody").innerHTML = cartona;
}



function setData(index){

    indexUpdate = index ;
    var currentBookmark = bookMarkList[index];
    bookmarkNameInput.value = currentBookmark.name;
    websiteUrlInput.value = currentBookmark.category;
    updateBtn.classList.remove("d-none");
    addBtn.classList.add("d-none");
}
function updateBookmark(){
    var bookmark = {
        name: bookmarkNameInput.value ,
        category: websiteUrlInput.value ,
    };
    bookMarkList.splice(indexUpdate,1,bookmark);
    localStorage.setItem("bookmarks",JSON.stringify(bookMarkList));
    displayData()
    updateBtn.classList.add("d-none");
    addBtn.classList.remove("d-none");
    clearForm ()
}

function validationName(){
    // console.log("hello");
    var massageName = document.getElementById("massageName");
    // var regexName = /^[A-Z][a-z]{2,8}$/
    var regexName = /^[\w]{3}/
    var text = bookmarkNameInput.value;
    // console.log(text);
    console.log( regexName.test(text) );
    if(regexName.test(text)== true){
        bookmarkNameInput.classList.add("is-valid");
        bookmarkNameInput.classList.remove("is-invalid");
        massageName.classList.add("d-none");
        return true;

    }else{
        bookmarkNameInput.classList.add("is-invalid");
        bookmarkNameInput.classList.remove("is-valid");
        massageName.classList.remove("d-none");
        return false;
    }

}

function validationUrl(){
    // console.log("hello");
    var massageUrl = document.getElementById("massageUrl");
    var regexUrl = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/;
    var text = websiteUrlInput.value;
    // console.log(text);
    console.log( regexUrl.test(text) );
    if(regexUrl.test(text)== true){
        websiteUrlInput.classList.add("is-valid");
        websiteUrlInput.classList.remove("is-invalid");
        massageUrl.classList.add("d-none");
        return true;

    }else{
        websiteUrlInput.classList.add("is-invalid");
        websiteUrlInput.classList.remove("is-valid");
        massageUrl.classList.remove("d-none");
        return false;
    }
}
