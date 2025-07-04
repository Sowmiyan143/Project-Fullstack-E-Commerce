import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function RelatedProducts () {


    const [related, setRelated] = useState([]);
    const { id } = useParams();

    useEffect(() =>{
        fetch(`http://127.0.0.1:8000/api/products/${id}/related`)
        .then(res=> res.json())
        .then(res=>setRelated(res))
    },[id])
    // if (!related) return <p>loding...</p>


    return(
        <>
        <div className="small-container">
            <div className="row row-2">
                <h2>Related Product</h2>
                <p>View More</p>
            </div>
        </div>

        <div className="small-container">
            <div className="row row-2">
                <select name="" id="">
                    <option value="">Default Shorting</option>
                    <option value="">Short by price</option>
                    <option value="">Short by popularity</option>
                    <option value="">Short by rating</option>
                    <option value="">Short by sale</option>
                </select>
            </div>
            <div className="row">
                {related.map((item, index)=>(
                    <div className="col-4" key={index}>
                    <Link to={`/productdetail/${item.id}`}><img src={`http://127.0.0.1:8000${item.images?.[0]?.image}`} alt=""/></Link>
                    <h4>{item.name}</h4>


                    <div className="rating">
                    {
                        Array.from({length:5}, (_, index)=> {
                            const filled = index < Math.floor(item.rating);
                            const half = index < item.rating && index >= Math.floor(item.rating);

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
                            )
                        })
                    }
                    </div>


                    <p>{Number(item.price).toLocaleString('en-IN', {style:'currency', currency:'INR'})}</p>
                    </div>
                ))}
            </div>
        </div>

        </>
    )
}
export default RelatedProducts;