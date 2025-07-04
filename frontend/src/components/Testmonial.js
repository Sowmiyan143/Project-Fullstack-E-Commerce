import { useState, useEffect } from 'react'
import Slider from "react-slick";

function Testmonial () {

    const [reviews, setReviews] = useState([]);

    useEffect(()=>{
        fetch("http://127.0.0.1:8000/api/reviews/")
        .then(res => res.json())
        .then(data => setReviews(data));
    },[]);


     const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
        {
            breakpoint: 1024,
            settings: { slidesToShow: 2 }
        },
        {
            breakpoint: 600,
            settings: { slidesToShow: 1 }
        }
        ]
    };

    return(
    <div className="testimonial">
        <div className="small-container">
            <div style={{ padding: "0 25px" }}>
                <Slider {...settings} className='slider-row'>
                {reviews.map((review, index)=>(
                    <div className="col-3" id='slide-col3' key={index}>
                        <i className="fa fa-quote-left"></i>
                        <p>{review.content}</p>
                        <div className="rating">
                            {Array.from({length:5},(_, i)=>{
                                const filled = i < Math.floor(review.rating);
                                const half = i < review.rating && i >= Math.floor(review.rating);
                                return (
                                    <i
                                        key={i}
                                        className= {
                                            filled ? "fas fa-star"
                                            : half ? "fas fa-star-half-alt"
                                            :"far fa-star"
                                        }
                                        style={{ color: "#ff523b" }}
                                    ></i>
                                )
                            })}
                        </div>
                        <img src={review.image_url ? `http://127.0.0.1:8000${review.image_url}` : '/default-user.png'} alt="reviewer"/>
                        <h3>{review.user_name}</h3>
                    </div>
                ))}
                </Slider>
            </div>
        </div>
    </div>
    )
}
export default Testmonial;