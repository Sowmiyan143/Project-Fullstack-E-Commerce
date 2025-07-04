import playStore from '../images/play-store.png'
import appStore from '../images/app-store.png'
import logo from '../images/logo-white.png'

function Footer () {
    return(
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="footer-col-1">
                            <h3>Download Our App</h3>
                            <p>Download App for Android and ios mobile phone</p>
                            <div className="app-logo">
                                <img src={playStore} alt=""/>
                                <img src={appStore} alt=""/>
                            </div>
                        </div>
                        <div className="footer-col-2">
                            <img src={logo} alt=""/>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ipsa maiores cum. Quae, sunt aliquam? Eos, harum exercitationem.</p>
                        </div>
                        <div className="footer-col-3">
                            <h3>Useful Links</h3>
                            <ul>
                                <li>Couponse</li>
                                <li>Blog Post</li>
                                <li>Return Polocy</li>
                                <li>Join Affiliate</li>
                            </ul>
                        </div>
                        <div className="footer-col-4">
                            <h3>Follow</h3>
                            <ul>
                                <li>FaceBook</li>
                                <li>Twitter</li>
                                <li>Instagram</li>
                                <li>YouTube</li>
                            </ul>
                        </div>
                    </div>
                    <hr/>
                    <p className="copyright">Copyright 2020 -Easy Tutorials</p>
                </div>
            </div>

    )
}
export default Footer;