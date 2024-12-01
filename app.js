const API = 'http://localhost:3000/product'

async function fetchProduct(){
    const response = await fetch(API ,{
        method: 'GET',
        header: {
            'Content-Type': 'application/json'
        }
    })

    const products = await response.json()   //Озубуздун тилге озгортуп алабыз
   displayProducts(products)
}

function displayProducts(products){
    
    const productLists = document.querySelector('.main')

    productLists.innerHTML = products.map(product =>`
        <div class='product'>
           <img src="${product.img}" alt='Error :(' class='product__img' />
           <div class="block-product">
              <h2 class='product__title'><a href="#">${product.title}</a></h2>
              <p class='product__price'>Film, ${product.price}  $</p>
              <div class="edit-delete">
                <a href='edit.html?id=${product.id}' class="edit__link">Редактирование</a>
                <button class="delete__btn" onclick='deleteProduct(${product.id})'>Delete</button>
              </div> 
              
              <p class='product__desc'>${product.description}</p>
             
           </div>
           
        </div>
        `).join('')
    
}
    


// Удалить продукт

async function deleteProduct(id){
   await fetch(`${API}/${id}`, {
    method: 'DELETE'
   })
   fetchProduct()
}
  
fetchProduct()

// Добавить Button

async function addProduct(e) {
    
   
    const img =document.getElementById('img').value
    const title =document.getElementById('title').value
    const description =document.getElementById('description').value
    const price =document.getElementById('price').value
  
   
    
    const newProduct = {
            id: Date.now(),
            img,
            title,
            description,
            price: Number(price)
            
    }
   
    await fetch(API,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct)              //Беккендтин тилине которуп алабыз
    })
    e.preventDefault()

}
    







// Поиск...

async function searchProduct(event) {
    const searchQuery = event.target.value.toLowerCase()

    const response = await fetch(API)
    const products = await response.json()

    const filteredProducts = products.filter(product => product.title.toLowerCase(). 
      includes(searchQuery))

      displayProducts(filteredProducts)
}

document.getElementById('search').addEventListener('input',searchProduct)




