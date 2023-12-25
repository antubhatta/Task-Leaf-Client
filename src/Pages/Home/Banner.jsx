
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';



const Banner = () => {
    return (
        <Carousel>

            <div className="h-[700px]">
                
                <img src={'https://i.ibb.co/j3gBmYp/jason-goodman-Oalh2-Moj-Uuk-unsplash.jpg'} />
                
            </div>
            <div className="h-[800px]" >
                
            <img src={'https://i.ibb.co/mFQ1Npj/scott-graham-5f-Nm-Wej4t-AA-unsplash.jpg'} />
                   
            </div>
            <div className="h-[700px]">
                <img src={'https://i.ibb.co/Vj32hK8/austin-distel-Vv-Acr-Va56fc-unsplash.jpg'} />
            </div>
            <div className="h-[800px]">
                <img src={'https://i.ibb.co/XkYJMDZ/airfocus-Zu2-JOWDXAt4-unsplash.jpg'} />
            </div>

        </Carousel>
    );
};

export default Banner;