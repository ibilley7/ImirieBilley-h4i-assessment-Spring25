import { Link, useLocation } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Displaypage.css";

/* Components */
import GalleryCard from "../../components/GalleryCard";

/* Background image*/
import image from "../../assets/background.jpg";

/* Defines the type for the slide object that will be sent to the GalleryCard page to be formatted into a proper gallery*/
type Slide = {
    url: string,
    title: string,
    description: string,
    date: string
}

/* Defines type for item, which is used to iterate through the searched data (from the NASA API) passed through the LandingPage */
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

/* 
    The purpose of this function is to recieve the searched data passed from the LandingPage, organize it so it includes only relevant data,
    sends it to the GalleryCard.tsx file to be properly formatted and styled, and displays that to the page with the /display path
*/
export default function DisplayPage(){
    // Accessed the data that needs to be processed that came from the LandingPage
    const { state } = useLocation();
    // Stores the data into an array of "slides", which carries only the information needed from each search item (url, title, description, date)
    const slides: Slide[] = [];

    // Sorts through each element, saving only the data needed, and saving it to the slides array
    state.collection.items.forEach((item: Item)=> {
        if(item.data?.[0] && item.links?.[0]?.href) {
            const imageData = item.data[0];
            const imageUrl = item.links[0].href;

            // Pushes each entry (filtered to only include url, title, description, and date) to the slides array
            slides.push({
                url: imageUrl,
                title: imageData.title || 'Untitled',
                description: imageData.description || 'No description available',
                date: imageData.date_created
                    ? new Date(imageData.date_created).toLocaleDateString("en-US", { // Formats date so that it displays like this: Month Day, Year
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