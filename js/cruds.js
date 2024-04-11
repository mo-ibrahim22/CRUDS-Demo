let productName = document.getElementById('productNameInput');
let productPrice = document.getElementById('productPriceInput');
let productCategory = document.getElementById('productCategoryInput');
let productDesc = document.getElementById('productDescInput');
let searchInput = document.getElementById('searchInput');
let addProductBtn = document.getElementById('addProductBtn');
let updateProductBtn = document.getElementById('updateProductBtn');
let productDetails = document.getElementById('productDetails');
let productTable = document.getElementById('productTable');
let globalIndex = 0;
let productList;

updateProductBtn.style.display = 'none';

if (localStorage.getItem('productList') == null) {
    productList = [];
} else {
    productList = JSON.parse(localStorage.getItem('productList'));
    displayProduct(productList);
}



function addProduct() {

    if (productName.value == '' || productPrice.value == '' || productCategory.value == '' || productDesc.value == '') {
        alert('Please fill all the fields');
        return;
    }
    let product =
    {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDesc.value
    };
    productList.push(product);
    localStorage.setItem('productList', JSON.stringify(productList));
    alert('Product added successfully');
    clearForm();
    displayProduct(productList);
    productTable.scrollIntoView();
}

function displayProduct(filteredList) {
    let productCollection = '';
    for (let i = 0; i < filteredList.length; i++) {
        productCollection +=
            `<tr>
            <td>${i + 1}</td>
            <td>${filteredList[i].name}</td>
            <td>${filteredList[i].price}</td>
            <td>${filteredList[i].category}</td>
            <td>${filteredList[i].desc}</td>
            <td><button class="btn btn-warning" onclick="updateProductDisplay(${i})">Update</button></td>
            <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
            </tr>`;
    }
    document.getElementById('productTableBody').innerHTML = productCollection;
}

function clearForm() {
    productName.value = '';
    productPrice.value = '';
    productCategory.value = '';
    productDesc.value = '';
}

function deleteProduct(index) {
    productList.splice(index, 1);
    localStorage.setItem('productList', JSON.stringify(productList));
    alert('Product deleted successfully');
    displayProduct(productList);
}

function searchProduct() {
    let searchTerm = searchInput.value;
    let searchResult = [];
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
            searchResult.push(productList[i]);
        }
    }
    displayProduct(searchResult);
}

function updateProductDisplay(index) {
    alert('Product ID: ' + `${index + 1}`)
    productName.value = productList[index].name;
    productPrice.value = productList[index].price;
    productCategory.value = productList[index].category;
    productDesc.value = productList[index].desc;
    addProductBtn.style.display = 'none';
    updateProductBtn.style.display = 'block';
    productDetails.scrollIntoView();
    globalIndex = index;
}

function updateProduct() {
    if (productName.value == '' || productPrice.value == '' || productCategory.value == '' || productDesc.value == '') {
        alert('Please fill all the fields');
        return;
    }
    productList[globalIndex].name = productName.value;
    productList[globalIndex].price = productPrice.value;
    productList[globalIndex].category = productCategory.value;
    productList[globalIndex].desc = productDesc.value;
    localStorage.setItem('productList', JSON.stringify(productList));
    alert('Product updated successfully');
    clearForm();
    addProductBtn.style.display = 'block';
    updateProductBtn.style.display = 'none';
    displayProduct(productList);
    productTable.scrollIntoView();
}