const API = 'http://localhost:3000/product';

// Получение продукта по ID
async function fetchProduct(id) {
  const response = await fetch(`${API}/${id}`, {
    method: "GET"
  });
  return await response.json();
}

// Обновление продукта по ID
async function updateProduct(productId, newProduct) {
  await fetch(`${API}/${productId}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newProduct)
  });
}

document.addEventListener('DOMContentLoaded', async () => { 
  const urlParams = new URLSearchParams(window.location.search); 
  const productId = urlParams.get('id'); 

  // id син жана продуктту алып алабыз
  const product = await fetchProduct(productId);
   
  // названиесин input га чыгарып алабыз
  document.getElementById('title').value = product.title;
  document.getElementById('img').value = product.img;
  document.getElementById('price').value = product.price;
  document.getElementById('description').value = product.description;

  const editForm = document.getElementById('form');
  editForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // input тагы значениелерди алып алабыз
    const newProduct = {  
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      price: document.getElementById('price').value,
      img: document.getElementById('img').value
    };
   
    await updateProduct(productId, newProduct); // Используем **productId**

    window.location.href = 'index.html'
  });
});
