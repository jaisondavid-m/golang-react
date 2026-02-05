import React, { useEffect, useState } from 'react'
import api from '../api/axios';

function Home() {
    const [products,setProducts]=useState([]);
    const [users,setUsers]=useState([]);
    const [admins,setAdmins]=useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProducts = async () => {
        try {
            const res = await api.get("/products");
            setProducts(res.data);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to load products");
        }
        };
        loadProducts();        
    }, []);
    useEffect(() => {
        const loadUsers = async () => {
        try {
            const res = await api.get("/users");
            setUsers(res.data);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to load products");
        }
        };
        loadUsers();        
    }, []);
    useEffect(() => {
        const loadAdmins = async () => {
        try {
            const res = await api.get("/admins");
            setAdmins(res.data);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to load products");
        }
        };
        loadAdmins();        
    }, []);

  return (
    <div>
        <p className='underline'>products</p>
        <ul>
        {products.map((p,i) => (
            <li key={p.id}>
            <strong>{p.product_name}</strong> — ₹{p.product_price}
            </li>
        ))}
        </ul>
        <p className='underline'>users</p>
        <ul>
        {users.map((u,i) => (
            <li key={i}>
            <strong>{u.userid}</strong>
            </li>
        ))}
        </ul>
        <p className='underline'>admins</p>
        <ul>
        {admins.map((a,i) => (
            <li key={i}>
            <strong>{a.userid}</strong>
            </li>
        ))}
        </ul>
    </div>
  )
}

export default Home
