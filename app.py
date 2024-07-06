from flask import Flask, jsonify, request

app = Flask(__name__)

# Example menu data (can be stored in a database in a real app)
menu = [
    {"id": 1, "name": "Cheeseburger", "price": 10.99},
    {"id": 2, "name": "Pizza", "price": 12.99},
    {"id": 3, "name": "Salad", "price": 8.99}
]

orders = []

# Endpoint to get the menu
@app.route('/menu', methods=['GET'])
def get_menu():
    return jsonify(menu)

# Endpoint to place an order
@app.route('/order', methods=['POST'])
def place_order():
    data = request.get_json()
    item_id = data.get('item_id')
    quantity = data.get('quantity')

    if not item_id or not quantity:
        return jsonify({"error": "Invalid request. Please provide item_id and quantity."}), 400

    item = next((item for item in menu if item['id'] == item_id), None)
    if not item:
        return jsonify({"error": "Item not found."}), 404

    total_price = item['price'] * quantity
    orders.append({"item": item, "quantity": quantity, "total_price": total_price})

    return jsonify({"message": "Order placed successfully."})

# Endpoint to get all orders
@app.route('/orders', methods=['GET'])
def get_orders():
    return jsonify(orders)

if __name__ == '__main__':
    app.run(debug=True)
