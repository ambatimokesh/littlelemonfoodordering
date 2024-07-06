document.addEventListener('DOMContentLoaded', function() {
    // Fetch menu items from backend
    fetch('/menu')
        .then(response => response.json())
        .then(data => {
            const menuDiv = document.getElementById('menu');
            menu.forEach(item => {
                menuDiv.innerHTML += `<p>${item.name} - $${item.price.toFixed(2)}</p>`;
                const select = document.getElementById('item');
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent = `${item.name} - $${item.price.toFixed(2)}`;
                select.appendChild(option);
            });
        });

    // Fetch orders from backend
    fetch('/orders')
        .then(response => response.json())
        .then(data => {
            const ordersList = document.getElementById('orderList');
            data.forEach(order => {
                ordersList.innerHTML += `<li><span>${order.item.name}</span>Quantity: ${order.quantity} | Total Price: $${order.total_price.toFixed(2)}</li>`;
            });
        });
});

function placeOrder() {
    const item = document.getElementById('item').value;
    const quantity = document.getElementById('quantity').value;

    fetch('/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            item_id: parseInt(item),
            quantity: parseInt(quantity)
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        location.reload(); // Refresh page to update orders
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
