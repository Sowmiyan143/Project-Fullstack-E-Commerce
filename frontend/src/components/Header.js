import {Link, useNavigate} from 'react-router-dom';
import Logo from '../images/logo.png'
import { useEffect, useState } from 'react';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import ReviewForm from './ReviewForm';


function Header () {

    const [menuopen, setMenuopen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false)
    const navigate = useNavigate();

    useEffect(()=>{
        const access = localStorage.getItem("access_token");
        setIsAuthenticated(!!access);
    },[]);


    const logout = async () => {
        const refresh = localStorage.getItem("refresh_token");

        try {
        const res = await fetch("http://127.0.0.1:8000/api/logout/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify({refresh}),
        });

        if (res.status === 205) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            setIsAuthenticated(false);
            navigate('/account');
        } else {
            alert("logout failed")
        } 
    } catch (err) {
        console.error("error", err);
    }
    
    };

    const handleReviewClick = () =>{
        if (!isAuthenticated) {
            alert("Please login to submit a review.");
            navigate('/account');
            return;
        }
        setIsReviewFormOpen(true)
    };


    

    function togglemenu(){
        setMenuopen(!menuopen);
    };
    return (
        <div className="header">
            <div className="container">
                <div className="navbar">
                    <div className="logo">
                        <Link to={"/home"}><img src={Logo} width="125px" alt=""/></Link>
                    </div>
                    <nav>
                        <ul id="MenuItems" style={{maxHeight: menuopen? "200px" : "0px"}}>
                            <li><Link to={"/home"}>Home</Link></li>
                            <li><Link to={"/product"}>Product</Link></li>
                            <li><Link to={"/cart"}>About</Link></li>
                            <li>
                                <span onClick={handleReviewClick} style={{background: 'none',color: '#555',border: 'none',fontSize: '15px',cursor: 'pointer'}}>
                                    Review
                                </span>
                            </li>
                            <li><Link to={"/account"}>Account</Link></li>
                            {isAuthenticated && <li>
                                <button onClick={logout} style={{
                                    background: 'none',
                                    color:'#555',
                                    border:'none',
                                    fontSize:'15px',
                                    cursor:'pointer'
                                }}>Logout</button>    
                            </li>}
                        </ul>
                    </nav>
                    <Link to={"/cart"}><FaShoppingCart className="cart-icon" /></Link>
                    <FaBars className="menu-icon" onClick={togglemenu}/>
                    <ReviewForm isOpen={isReviewFormOpen} onClose={()=> setIsReviewFormOpen(false)}/>
                </div>
            </div>
        </div>
    )
}
export default Header;