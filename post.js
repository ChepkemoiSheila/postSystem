const postList = document.querySelector(".postlist")
const postForm = document.querySelector(".postform")

const titleval = document.getElementById("title")
const descriptionVal = document.getElementById("description")
const btnSubmit = document.querySelector(".btn");
const url = "http://localhost:4000/posts";

//get request

fetch(url)
.then(response => response.json())
.then(data =>data.forEach(function(post){
    postList.innerHTML += `
    <div class="card mt-4 col-md-6" style="width: 40rem;">
    <div class="card-body" data-id = ${post.id}>
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.description}</p>
          <button class="card-link" id= "editbtn">Edit</button>
          <button class="card-link" id = "deletebtn">Delete</button>
        </div>
        </div>


    `
}))

postList.addEventListener("click",(e)=>{
    e.preventDefault();
    let editaPost = e.target.id == "editbtn";
   
    let deletePost = e.target.id == "deletebtn";

    //delete post
    let id= e.target.parentElement.dataset.id;

    if(deletePost){
        fetch(`${url}/${id}`,
         {
             method: "DELETE",
        })
        
        .then(response => response.json())
        .then(() => location.reload())
    }
    //edit post

    if  (editaPost){
        
       const parentE = e.target.parentElement;

        let titlecontent = parentE.querySelector(".card-title").textContent;
        let descontent = parentE.querySelector(".card-text").textContent;
        

        titleval.value = titlecontent;
        descriptionVal.value = descontent;
  
    }
    btnSubmit.addEventListener("click", (e)=>{
        e.preventDefault()
        fetch(`${url}/${id}`,{
            method : "PATCH",
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify({
                title: titleval.value,
                description: descriptionVal.value
              }),
        })
        .then(response => response.json())
        .then(() => location.reload())

    })
  
});

//edit post


//create new post

postForm.addEventListener("submit", (event)=>{
    event.preventDefault()
    fetch(`${url}`,{
        method : 'POST',
        headers : {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: titleval.value,
            description: descriptionVal.value
          }),      
    })
    .then(response => response.json())
    .then(post=>{
    postList.innerHTML += `
    <div class="card mt-4 col-md-6" style="width: 40rem;">
    <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.description}</p>
          <button class="card-link">Edit</button>
          <button class="card-link">Delete</button>
        </div>
        </div>
    `
})
//reset
titleval.value = "";
descriptionVal.value="";

})

