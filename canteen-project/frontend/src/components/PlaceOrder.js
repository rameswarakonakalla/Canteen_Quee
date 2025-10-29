import React, {useState} from 'react';
import API from '../api';

export default function PlaceOrder({menu}){
  const [items, setItems] = useState({});
  const handleQty = (id, qty) => setItems({...items, [id]: qty});
  const submit = async () => {
    const orderItems = Object.keys(items).filter(k=>items[k]>0).map(k=>({menuItemId: parseInt(k), quantity: parseInt(items[k])}));
    if(orderItems.length===0) return alert('select items');
    const total = orderItems.reduce((s, it)=>{
      const mi = menu.find(m=>m.id===it.menuItemId);
      return s + (mi.price * it.quantity);
    },0);
    const payload = { userId: 1, totalPrice: total, items: orderItems };
    const res = await API.post('/orders', payload);
    alert('Order placed! Token: '+res.data.tokenNumber);
  }
  return (
    <div>
      <h3>Place Order</h3>
      {menu.map(m=> (
        <div key={m.id}>
          <span>{m.name} - ₹{m.price}</span>
          <input type="number" min="0" defaultValue={0} onChange={e=>handleQty(m.id, e.target.value)} />
        </div>
      ))}
      <button onClick={submit}>Place Order</button>
    </div>
  )
}
