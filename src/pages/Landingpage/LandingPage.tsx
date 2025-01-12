import { useState } from 'react';
import { useNavigate} from "react-router-dom";
import "./LandingPage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* Background image*/
import image from "../../assets/background.jpg";

/* API Endpoint*/
const API_URL = 'https://images-api.nasa.gov/search';

// Component for entering the search parameters
export default function LandingPage () {
    const navigate = useNavigate();

    // Query parameters
    const [query, setQuery] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');

    // Used to displays error message when no results are found
    const [noResults, setNoResults] = useState(false);

    // Loading feature when submit is clicked
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Function for fetching from the API using the query parameters that is collected from the form when it's submitted
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setNoResults(false);

        try{
            // Collects parameters from the form
            const searchParams = new URLSearchParams({
                q: query,
                year_start: startYear,
                year_end: endYear,
                media_type: 'image'
            });

            const response = await fetch(`${API_URL}?${searchParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if(!response.ok){
                throw new Error(`HTTP error status: ${response.status}`);
            }
            const data = await response.json();

            // If nothing was fetched from the API, displays message
            // Else navigate to Displaypage, which has the path /display, and send the fetched data there
            if(data.collection?.items?.length === 0) {
                setNoResults(true);
            } else {
                navigate("/display", { state: data});
            } 

        // Displays error message
        } catch(err) {
            setError(err instanceof Error ? err.message : 'An error occured');
            console.error('Error fetching data', err);
        } finally {
            setIsLoading(false);
        }
    }
   
    return (
        // div for the entire screen/ background
        <div className="container">
            <div
                className="background" 
                style={{
                    backgroundImage:`url(${image})`
                }}
            />
        
            <div className="content">
                <div className="header-container">
                    <h1 className="header">NASA Image Search</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter in phrase" value={query} onChange={(e) => setQuery(e.target.value)} required/><br></br>
                    <label>Select Year Range: 
                        <input type="number" value={startYear} onChange={(e) => setStartYear(e.target.value)} min="1920" max="2024" required/> 
                        <input type="number" value={endYear} onChange={(e) => setEndYear(e.target.value)} min="1920" max="2024" required/>
                    </label><br></br>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Searching...' : 'Search!'}
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </form>

                {noResults && <p className="no-results-message">No results found. Please try a different query or adjust the year range.</p>}

            </div>
        </div>
        

    );
}