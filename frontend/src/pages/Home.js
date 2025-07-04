import Homeheader from '../components/Homeheader'
import Categories from '../components/Categories';
import Features from '../components/Features';
import Latest from '../components/Latest';
import Offer from '../components/Offer';
import Testmonial from '../components/Testmonial';
import Brands from '../components/Brands';
function Home(){
    return(
        <>
            <Homeheader/>
            <Categories/>
            <Features/>
            <Latest/>
            <Offer/>
            <Testmonial/>
            <Brands/>
        </>
    )
}

export default Home;