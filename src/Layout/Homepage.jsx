import Clock from '../Components/Clock';
import Headline from '../Components/Headline';
import Packages from '../Components/Packages';
import Slider from '../Components/Slider';

const Homepage = () => {
    return (
        <div className="">
            <Headline></Headline>
            <Slider></Slider>
            <Packages></Packages>
            <div className="md:grid grid-cols-2 gap-2 w-11/12 mx-auto">
                <div className="">
                    <Clock></Clock>
                </div>
            </div>
        </div>
    );

};

export default Homepage;