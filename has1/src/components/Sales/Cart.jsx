import React from 'react';

const Cart = ({ items, onRemove, onUpdateQuantity }) => {
  return (
    <div>
      <h3>Cart</h3>
      {items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.product_id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      onUpdateQuantity(item.product_id, parseInt(e.target.value))
                    }
                    min="1"
                  />
                </td>
                <td>{(item.price * item.quantity).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => onRemove(item.product_id)}
                    className="btn btn-sm btn-danger"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Cart;