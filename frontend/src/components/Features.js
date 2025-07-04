import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Features() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/feature`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,             // Auto slide
    autoplaySpeed: 1500, 
    rtl: true,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="small-container product-slider-container">
      <h2 className="title">Feature Products</h2>
      <Slider {...settings}>
        {products.map((product) => (
          <div className="col-4" key={product.id}>
            <img
              src={`http://127.0.0.1:8000${product.images?.[0]?.image}`}
              alt=""
              style={{ width: '100%', height: '350px', objectFit: 'cover',paddingRight:'10px', paddingLeft:'10px' }}
            />
            <h4>{product.name}</h4>
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
        ))}
      </Slider>
    </div>
  );
}

export default Features;
