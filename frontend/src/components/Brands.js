import brand1 from '../images/logo-godrej.png'
import brand2 from '../images/logo-oppo.png'
import brand3 from '../images/logo-coca-cola.png'
import brand4 from '../images/logo-paypal.png'
import brand5 from '../images/logo-philips.png'
function Brands(){
    return(
    <div class="brands">
        <div class="small-container">
            <div class="row">
                <div class="col-5">
                    <img src={brand1} alt=""/>
                </div>
                <div class="col-5">
                    <img src={brand2} alt=""/>
                </div>
                <div class="col-5">
                    <img src={brand3} alt=""/>
                </div>
                <div class="col-5">
                    <img src={brand4} alt=""/>
                </div>
                <div class="col-5">
                    <img src={brand5} alt=""/>
                </div>
            </div>
        </div>
    </div>

    )
}
export default Brands;