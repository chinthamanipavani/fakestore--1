


let container = document.getElementById("container");
let btn = document.getElementById("btn");
let loader = document.getElementById("loader");

btn.addEventListener("click", addData);

// Listen for Enter key press
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addData();
    }
});

function addData() {
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let category = document.getElementById("category");
    let price = document.getElementById("price");

    if (title.value === "" || description.value === "" || price.value === "" || category.value === "") {
        alert("Enter all data fields!");
    } else {
        // Show loader
        loader.style.display = "block";

        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title.value,
                description: description.value,
                category: category.value,
                price: price.value
            })
        };

        fetch("https://buttered-aerial-topaz.glitch.me/products", options)
            .then(res => {
                if (res.ok) {
                    title.value = '';
                    price.value = '';
                    description.value = '';
                    category.value = '';
                    getData();
                    alert("Data added successfully");
                }
            })
            .catch(err => console.error("Error adding data:", err))
            .finally(() => {
                // Hide loader after request completes
                loader.style.display = "none";
            });
    }
}

function getData() {
    loader.style.display = "block"; // Show loader when fetching data

    fetch("https://buttered-aerial-topaz.glitch.me/products")
        .then(res => res.json())
        .then(data => displayData(data))
        .catch(err => console.error("Error fetching data:", err))
        .finally(() => {
            loader.style.display = "none"; // Hide loader after data loads
        });
}

function displayData(data) {
    container.innerHTML = ``;
    
    if (data.length === 0) {
        container.innerHTML = `<p>No products available</p>`;
        return;
    }

    data.forEach(obj => {
        let item = document.createElement("div");
        item.className = "item";
        item.innerHTML = `
            <img class='image' src="${obj.image}" alt="${obj.title}">
            <p id="title"><b>${obj.title}</b></p>
            <p class="description">${obj.description}</p>
            <p class="category">${obj.category}</p>
            <p class="price">₹ ${obj.price}</p>
            <button onclick="deleteData('${obj.id}')">Delete</button>
        `;
        container.appendChild(item);
    });
}

function deleteData(id) {
    let options = {
        method: "DELETE"
    };

    loader.style.display = "block"; // Show loader during delete

    fetch(`https://buttered-aerial-topaz.glitch.me/products/${id}`, options)
        .then(res => {
            if (res.ok) {
                getData(); 
                alert("Data deleted successfully");
            }
        })
        .catch(err => console.error("Error deleting data:", err))
        .finally(() => {
            loader.style.display = "none"; // Hide loader after delete
        });
}

// Fetch data when the page loads
getData();
