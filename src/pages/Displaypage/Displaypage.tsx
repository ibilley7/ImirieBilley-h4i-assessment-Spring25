import { useLocation } from "react-router-dom";
//import { useState, useEffect} from 'react';
//import axios from 'axios';
//const API_URL = 'https://images-api.nasa.gov/search';


export default function DisplayPage(){
    const { state } = useLocation();
    const phrase = state.phrase;
    const startYear = state.startYear;
    const endYear = state.endYear;


    // Posts is an empty array at the start
    //const [posts, setPosts] = useState([]);

    // Defining the function that is fetching the data from the API
    /*const fetchData = async () => {
        const { data } = await axios.get(API_URL.concat(`/?q=${state.phrase}`));
        setPosts(data);
    }

    // useEffect hook triggers the fetchData after the first render
    useEffect(() => {
        fetchData();
    }, []);
    */
    


    return (
        
        <div>
            <p>Phrase: {phrase}</p>
            <p>Start year: {startYear}</p>
            <p>End year: {endYear}</p>
            
        </div>
    


    );
}