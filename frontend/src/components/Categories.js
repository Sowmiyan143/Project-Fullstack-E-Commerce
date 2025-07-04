// Import required hooks and react-slick components
import { useState, useEffect } from "react";
import Slider from "react-slick"; // Carousel component
import "slick-carousel/slick/slick.css";  // Slick core styles
import "slick-carousel/slick/slick-theme.css"; // Slick default theme

function Categories() {
    // State to hold fetched categories
    const [categories, setCategories] = useState([]);

    // Fetch category data from backend API when component mounts
    useEffect(() => {
        fetch('http://localhost:8000/api/category/')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok'); // Error handling
                return response.json();
            })
            .then(data => setCategories(data)) // Set data in state
            .catch(error => console.error('Failed to fetch categories:', error)); // Handle error
    }, []);

    // react-slick carousel settings
    const settings = {
        dots: true,                // No navigation dots
        infinite: true,             // Looping enabled
        speed: 1000,                 // Slide transition speed (ms)
        slidesToShow: 3,            // Show 4 slides at a time (desktop)
        slidesToScroll: 1,          // Scroll 1 slide at a time
        autoplay: true,             // Auto slide
        autoplaySpeed: 1500,        // Delay between slides (ms)
        responsive: [               // Adjust layout based on screen size
            {
                breakpoint: 1024,   // Tablets
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,    // Small tablets and large phones
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,    // Mobile
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    return (
        <div className="categories">
            <div className="small-container">
                <h2 className="title">Categories</h2>

                {/* Slider component that loops over categories */}
                <Slider {...settings}>
                    {categories.map((cat, index) => (
                        <div key={index} className="category-slide">
                            {/* Display category image */}
                            <img 
                                src={`http://localhost:8000${cat.image}`} 
                                alt={cat.name} 
                                style={{ width: '100%', height: '200px', objectFit: 'cover',paddingRight:'10px', paddingLeft:'10px' }} 
                            />
                            {/* Display category name */}
                            <h4 style={{ textAlign: "center", marginTop: "10px" }}>{cat.name}</h4>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Categories;
