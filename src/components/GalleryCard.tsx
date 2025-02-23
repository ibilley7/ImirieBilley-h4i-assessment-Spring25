import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./GalleryCard.css";

/* Typing each card*/
type Slide = {
    url: string,
    title: string,
    description: string,
    date: string
}

/* Typing for array of cards*/
type GalleryCardProps = {
    slides: Slide[];
}

/* 
    Describes the component for the GalleryCard slider, which uses React Slick, a carousel component for React.
    This function sets up the styling and layout for the cards and card slider that display the searched NASA API data.
*/
const GalleryCard = ({ slides }:GalleryCardProps) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:true,
        /*Changing arrow style*/
        prevArrow: <button type="button" className="slick-prev"></button>,
        nextArrow: <button type="button" className="slick-next"></button>
    };

    return(
        <div className="gallery-slider-container">
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className="card-container">
                        <div className="card">
                            
                            <div className="card-content">
                                <div className="card-left">
                                    
                                    <div className="card-header">
                                        <h2>{slide.title}</h2>
                                    </div>
                                    <img
                                        src={slide.url}
                                        alt={slide.title}
                                        className="card-image"
                                    />
                                    <p className="card-date">{slide.date}</p>
                                    
                                </div>
                                <div className="card-right">
                                    <p className="card-description">
                                        {slide.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
        
    );
}

export default GalleryCard;