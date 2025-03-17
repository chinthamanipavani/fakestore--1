 let container=document.getElementById("container")

let btn=document.getElementById("btn")
//click
btn.addEventListener("click",function (){      
    let title=document.getElementById("title")
    let description=document.getElementById("description")
    let category=document.getElementById("category")
    let price=document.getElementById("price")
    if(title.value==""||description.value==""||price.value==""||category.value==""){
        alert("enter data property")
    }
    else{
        let options={
            "method":"POST",
            "headers":{
                "Content-Type":"application/json"
            },
            "body":JSON.stringify({
                "title":title.value,
                "description":description.value,
                "category":category.value,
                "price":price.value
            })
        }
        fetch("https://buttered-aerial-topaz.glitch.me/products",options).then(res=>{
            if(res.ok){
                title.value='',
                price.value='',
                description.value='',
                category.value='',
                getData();
                alert("data added successfully")
            }
        })
    }
})





function getData(){
    fetch("https://buttered-aerial-topaz.glitch.me/products")
    .then(res=>res.json())
    .then(data=>displayData(data))

}
function displayData(data){
    container.innerHTML=``
    data.forEach(obj=>{
        // console.log(obj)

        let item=document.createElement("div")
        item.className="item"
        item.innerHTML=`
        <img class='image' src="${obj.image}">
        <p id="title"><b>${obj.title}</b></p>
        <p class="description">${obj.description}</p>
        <p class="category">${obj.category}</p>
        <p class="price">₹ ${obj.price}</p>
        <button onclick = "deleteData('${obj.id}')">Delete</button>
        `
        container.appendChild(item)
    })
}

function deleteData(id){
    console.log(id)
     let options= {
        "method":"DELETE"
     }
     fetch(`https://buttered-aerial-topaz.glitch.me/products/${id}`, options)
        .then(res => {
            if (res.ok) {
                getData(); // Refresh data after deletion
                alert("Data deleted successfully");
                
            } 
        })
        .catch(err => console.error("Error deleting data:", err));
}

// Fetch data when the page loads
getData();

