
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Product () {

    const [products,setProducts] = useState([]);
    const [currentPage, setCurrentPage ] = useState(1);
    const [totalPages, setTotalPages ] = useState(1);
    const [sortOrder, setSortOrder] = useState('');
    const productPerPage = 8;

    useEffect(()=> {
        fetch(`http://127.0.0.1:8000/api/products/?page=${currentPage}&ordering=${sortOrder}`)
        .then(response => response.json())
        .then(data => {
            setProducts(data.results);
            setTotalPages(Math.ceil(data.count/productPerPage));
        });
    },[currentPage, sortOrder   ]);

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortOrder(value); // Update sort order
        setCurrentPage(1);   // Reset to first page when sorting changes
    };

    // const indexOfLastProduct = currentPage * productPerPage;
    // const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    // const currentProducts = products.slice(indexOfFirstProduct,indexOfLastProduct);
    // const totalPages = Math.ceil(products.length/productPerPage)
    const pageNumbers = [...Array(totalPages).keys()].map(num => num+1);
    
    return(
    <div className="small-container">
        <div className="row row-2">
            <h2>All Products</h2>
            <select onChange={handleSortChange} value={sortOrder} >
                <option value="">Default Sorting</option>
                <option value="price">Sort by Price: Low to High</option>
                <option value="-price">Sort by Price: High to Low</option>
                <option value="-rating">Sort by Rating: High to Low</option>
                <option value="-created_at">Sort by Newest</option>
                <option value="name">Sort by Name A-Z</option>
            </select>
        </div>
        <div className="row">
            {products.map(product => 
                <div className="col-4" key={product.id}>
                <Link to={`/productdetail/${product.id}`}><img src={`http://127.0.0.1:8000${product.images?.[0]?.image}`}  alt=""/></Link>
                <h4>{product.name.length > 40 ? product.name.slice(0,40)+"..." : product.name}</h4>


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
                        style={{ color: "#ff523b" }}
                    ></i>
                );
            })}
        </div>


                
                <p>{Number(product.price).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            </div>
            )}
        </div>
        <div className="page-btn">
            {pageNumbers.map(number =>(
                <span key={number} onClick={()=>{setCurrentPage(number)}} style={{backgroundColor: currentPage === number ? '#ff523b' : '',color: currentPage === number ? '#fff' : '#000'}}>{number}</span>
            ))}
        </div>

    </div>
    )
}
export default Product;