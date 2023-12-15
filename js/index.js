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
    var bookmark = {
        name: bookmarkNameInput.value ,
        category: websiteUrlInput.value ,
    }

    bookMarkList.push(bookmark);


    localStorage.setItem("bookmarks",JSON.stringify(bookMarkList));

    clearForm();

    displayData();
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

function searchProduct(){
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