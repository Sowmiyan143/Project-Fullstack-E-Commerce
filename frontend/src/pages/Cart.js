import { useEffect, useState } from "react";
function Cart () {


    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        if (!token) {
            alert("Please login to view cart.");
            return;
        }

        fetch('http://127.0.0.1:8000/api/cart/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(res => res.json())
        .then(data => {
            if (data.items) {
                setCartItems(data.items);
            } else {
                console.log(data);
            }
        })
        .catch(err => console.error(err));
    }, []);

    useEffect(()=>{
        const subtotal = cartItems.reduce((acc, item)=> acc + item.product.price * item.quantity,0);
        setTotal(subtotal);
    },[cartItems])

    const handleChange = (index, newQty) => {
        const updatedCart = [...cartItems];
        updatedCart[index].quantity = parseInt(newQty);
        setCartItems(updatedCart);
    };

    const handleRemove = (index) => {
        const token = localStorage.getItem('access_token');
        const itemId = cartItems[index].id;
        fetch(`http://127.0.0.1:8000/api/deletecartitem/${itemId}/`,{
            method:'DELETE',
            headers:{
                Authorization: `Bearer ${token}`,
            },

        })
        .then(res=> {
            if(res.ok){
                const updatedCart = cartItems.filter((_,i) => i!== index);
                setCartItems(updatedCart);
            } else {
                alert("Failed to remove item from server.")
            }
        })
        .catch(err => {
            console.error(err);
            alert("Error removing item.");
        })
    };

        //     const updatedCart = cartItems.filter((_, i) => i !== index);
        // setCartItems(updatedCart);



    return(
    <div className="small-container cart-page">

        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                {cartItems.length === 0 && <p>No items in cart</p>}
                {cartItems.map((item,index)=>(
                    <tr key={index}>
                        <td>
                            <div className="cart-info">
                                <img src={`http://127.0.0.1:8000${item.product.images[0]?.image}`} alt=""/>
                                <div>
                                    <p>{item.product.name}</p>
                                    <small>${item.product.price}</small>
                                    <br/>
                                    {/* <a href="">Remove</a> */}
                                    <button onClick={() => handleRemove(index)} style={{ color: "red", cursor: "pointer", border: "none", background: "none" }}>
                                    Remove
                                    </button>

                                </div>
                            </div>
                        </td>
                        <td><input type="number" value={item.quantity} min="1" onChange={(e) => handleChange(index, e.target.value)}/></td>
                        <td>${item.product.price * item.quantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>


        <div className="total-price">

            <table>
                <tr>
                    <td>Subtotal</td>
                    <td>${total}</td>
                </tr>
                                <tr>
                    <td>Tax (18%)</td>
                    <td>${(total * 0.18).toFixed(2)}</td>
                </tr>
                                <tr>
                    <td>Total</td>
                    <td>${(total * 1.18).toFixed(2)}</td>
                </tr>
            </table>

        </div>

    </div>
    )
}
export default Cart;