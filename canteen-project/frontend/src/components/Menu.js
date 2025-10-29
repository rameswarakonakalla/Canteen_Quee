import React, {useState, useEffect} from 'react';
import API from '../api';
import PlaceOrder from './PlaceOrder';

export default function Menu(){
  const [menu, setMenu] = useState([]);
  useEffect(()=>{ API.get('/menu').then(r=>setMenu(r.data)); },[]);
  return (
    <div>
      <h2>Menu</h2>
      <ul>
        {menu.map(i=> <li key={i.id}>{i.name} - ₹{i.price} {i.available? '': '(NA)'}</li>)}
      </ul>
      <PlaceOrder menu={menu} />
    </div>
  )
}
