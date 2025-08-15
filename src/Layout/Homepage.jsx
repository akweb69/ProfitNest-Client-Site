import Clock from '../Components/Clock';
import Headline from '../Components/Headline';
import Packages from '../Components/Packages';
import Slider from '../Components/Slider';
import Testimonial from '../Components/Testimonial';

const Homepage = () => {
    return (
        <div className="">
            <Headline></Headline>
            <Slider></Slider>
            <Packages></Packages>
            <div className="md:grid grid-cols-2 gap-2 w-11/12 mx-auto rounded-lg bg-amber-400">
                <div className="">
                    <Clock></Clock>
                </div>
                <div className="">
                    <Testimonial></Testimonial>
                </div>
            </div>
        </div>
    );

};

export default Homepage;