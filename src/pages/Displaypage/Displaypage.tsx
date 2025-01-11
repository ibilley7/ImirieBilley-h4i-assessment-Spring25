import { Link, useLocation } from "react-router-dom";
// useEffect = perform API requests. Renders immediately
// useState = prepare a state in which the data is returned. Store returned data in React local state.
import GalleryCard from "../../components/GalleryCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Displaypage.css";
import image from "C:/Users/imiri/Desktop/ImirieBilley-h4i-assessment-Spring25/src/assets/background.jpg";

type Slide = {
    url: string,
    title: string,
    description: string,
    date: string
}

type Item = {
    data?: {
        title?: string,
        description?: string,
        date_created?: string;
    }[];
    links?: {
        href: string;
    }[];
}

export default function DisplayPage(){
    // Accessed what was passed through navigate. 
    const { state } = useLocation();
    // Search entry slides
    const slides: Slide[] = [];

    if(!state?.collection?.items) {
        return <div>No results found</div>;
    }


    /* 
    url:
    title:
    description:
    date:
    */

    state.collection.items.forEach((item: Item)=> {
        if(item.data?.[0] && item.links?.[0]?.href) {
            const imageData = item.data[0];
            const imageUrl = item.links[0].href;

            slides.push({
                url: imageUrl,
                title: imageData.title || 'Untitled',
                description: imageData.description || 'No description available',
                date: imageData.date_created
                    ? new Date(imageData.date_created).toLocaleDateString("en-US", {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })
                    : 'Unknown date',
            });
        }
    });

    return(
        <div className="container">
            <div
                className="background" 
                style={{
                    backgroundImage:`url(${image})`
                }}
            />
            <Link to="/" state={state}>
                <button>Back</button>
            </Link>
            <GalleryCard slides={slides}/>
        </div>
    );
}