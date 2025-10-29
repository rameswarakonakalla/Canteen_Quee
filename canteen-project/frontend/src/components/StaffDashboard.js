import React, {useEffect, useState} from 'react';
import API from '../api';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default function StaffDashboard(){
  const [orders, setOrders] = useState([]);
  useEffect(()=>{ API.get('/orders').then(r=>setOrders(r.data));
    const sock = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(sock);
    stompClient.connect({}, ()=>{
      stompClient.subscribe('/topic/orders', (msg)=>{
        const order = JSON.parse(msg.body);
        setOrders(prev=>{
          const idx = prev.findIndex(o=>o.id===order.id);
          if(idx>=0){ const copy=[...prev]; copy[idx]=order; return copy; }
          return [order, ...prev];
        });
      });
    });
  },[]);

  const updateStatus = async (id, status) => { await API.put(`/orders/${id}/status?status=`+status); }

  return (
    <div>
      <h2>Staff Dashboard</h2>
      <table>
        <thead><tr><th>Token</th><th>User</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          {orders.map(o=> (
            <tr key={o.id}>
              <td>{o.tokenNumber}</td>
              <td>{o.userId}</td>
              <td>₹{o.totalPrice}</td>
              <td>{o.status}</td>
              <td>
                <button onClick={()=>updateStatus(o.id,'PREPARING')}>Preparing</button>
                <button onClick={()=>updateStatus(o.id,'READY')}>Ready</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
