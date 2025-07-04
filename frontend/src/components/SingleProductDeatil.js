import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function SingleProductDeatil () {

    const [mainImg, setMainImg] = useState(null);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const {id} = useParams();




    useEffect(() =>{
        fetch(`http://127.0.0.1:8000/api/products/${id}/`)
        .then(res => res.json())
        .then(data => {
            setProduct(data);
            if (data.images?.length > 0) setMainImg(data.images[0].image)
        });
    },[id]);

    // const handleAddToCart = ()=>{

    //     axios.post('http://127.0.0.1:8000/api/cart/add/', {
    //         product_id: product.id,
    //         quantity: quantity
    //     })
    //     .then(res=> alert("Added to cart"))
    //     .catch(err=> console.error(err))
    // }


    const handleAddToCart = async () => {
        const token = localStorage.getItem('access_token');

        if (!token) {
            alert("Please login to add to cart.");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/cart/add/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    product_id: product.id,
                    quantity: parseInt(quantity)
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Added to cart!");
            } else {
                alert("Error: " + JSON.stringify(data));
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong!");
        }
    };


    if (!product) return <p>Loading...</p>;


    return(
    <div className="small-container single-product">
        <div className="row">
            <div className="col-2">
                <img src={`http://127.0.0.1:8000${mainImg}`} width="100%" id="ProductImg" alt=""/>
                <div className="small-img-row">
                    {product.images?.map((imgObj, index)=> (
                        <div className="small-img-col" key={index}>
                            <img src={`http://127.0.0.1:8000${imgObj.image}`} width="100%" alt="Thumbnail" className="small-img" onClick={()=>{setMainImg(imgObj.image)}}/>
                        </div>
                    ))}
                </div>
            </div>



            <div className="col-2" key={id}>
                <p>{product.category}</p>
                <h1>{product.name}</h1>

                
                <h4>{Number(product.price).toLocaleString('en-IN', {style: 'currency', currency: 'INR',})}</h4>

                {product.sizes && product.sizes.length > 0 && (
                <select name="" id="">
                    <option value="">Select Size</option>
                    {product.sizes?.map((size, index) => (
                    <option key={index}>{size}</option>
                    ))}
                </select>
                )
                }


                <input 
                type="number"
                value={quantity}
                min='1'
                onChange={(e)=>setQuantity(e.target.value)}
                />


                <a href="#" className="btn" onClick={handleAddToCart}>Add To Cart</a>
                <h3>Product Deatils <i className="fa fa-id-card"></i></h3>
                <br/>
                <p>{product.description}</p>

            </div>
        </div>
    </div>
    )
}
export default SingleProductDeatil;