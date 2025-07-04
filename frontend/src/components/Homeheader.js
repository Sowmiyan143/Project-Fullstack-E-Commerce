import image1 from '../images/image1.png'
function Homeheader(){
    return(
        <div className='header-home'>
        <div className='container'>
        <div className="row">
            <div className="col-2">
                <h1>Give Your Work <br/> A New Style</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit<br/>
                Eaque ullam asperiores quisquam quasi animi alias molestias accusantium fugiat sunt eum!</p>
                <a href="" className="btn">Explore Now &#8594;</a>
            </div>
            <div className="col-2">
                <img src={image1} alt=""/>
            </div>
        </div>
        </div>
        </div>
    )
}
export default Homeheader;