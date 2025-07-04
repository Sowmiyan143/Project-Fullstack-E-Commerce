import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Latest (){

    const [products, setProducts] = useState([]);


    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/api/latest`)
        .then(res =>res.json())
        .then(res => {
            setProducts(res)
        })
    },[])
    return(
    <div className="small-container">
        <h2 className="title">Latest Products</h2>
        <div className="row">
            {products.map((product =>(
                <div class="col-4" key={product.id}>
                <Link to={`/productdetail/${product.id}`}>
                <img src={`http://127.0.0.1:8000${product.images?.[0]?.image}`} alt=""/>
                <h4>{product.name}</h4>
                </Link>


            <div className="rating">
              {Array.from({ length: 5 }, (_, index) => {
                const filled = index < Math.floor(product.rating);
                const half = index < product.rating && index >= Math.floor(product.rating);
                return (
                  <i
                    key={index}
                    className={
                      filled
                        ? "fas fa-star"
                        : half
                        ? "fas fa-star-half-alt"
                        : "far fa-star"
                    }
                  ></i>
                );
              })}
            </div>

                
                <p>{Number(product.price).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            </div>
            )))}
        </div>
    </div>
    )
}
export default Latest;