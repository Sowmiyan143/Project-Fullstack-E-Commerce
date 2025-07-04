import offerimg from '../images/exclusive.png'
function Offer () {
    return(
    <div className="offer">
        <div className="small-container">
            <div className="row">
                <div className="col-2">
                    <img src={offerimg} alt="" className="offer-img"/>
                </div>
                <div className="col-2">
                    <p>Exclusively Available on RedStore</p>
                    <h1>Smart Brand 4</h1>
                    <small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore asperiores rem perspiciatis nobis minus perferendis cumque facilis. Quo perspiciatis quia ipsa mollitia at, id nesciunt.</small>
                    <a href="" className="btn">Buy Now &#8594;</a>
                </div>
            </div>
        </div>
     </div>
    )
}
export default Offer;