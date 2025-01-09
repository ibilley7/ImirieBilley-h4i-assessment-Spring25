import { useForm } from "react-hook-form";
import { FormEventHandler, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import "./LandingPage.css";
import image from "C:/Users/imiri/Desktop/ImirieBilley-h4i-assessment-Spring25/src/assets/background.jpg";
const API_URL = 'https://images-api.nasa.gov/search';
import { useEffect } from "react";

// Component for entering the search parameters
export default function LandingPage () {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    //const [posts, setPosts] = useState([]);
    const URL = API_URL + `q=${query}&start_year=${startYear}&end_year=${endYear}&media_type=image`;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try{
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
            navigate("/display", { state: data});
        } catch(err) {
            setError(err instanceof Error ? err.message : 'An error occured');
            console.error('Error fetching data', err);
        } finally {
            setIsLoading(false);
        }
    }
    /*useEffect(() => {
        fetch(URL)
            .then((res) => res.json())
            .then((res) => {
                setPosts(res);
            });
    }, []); */

    /*
    useEffect(() => {
        async function getData(){
            const response = await fetch(URL);
            const data = await response.json();
            setPosts(data);
        }

        getData();

        console.log(posts, "results");
    })

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Make sure posts is what it should be
        navigate("/display", { state: posts});
    }
        */
    

    /* const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(URL);
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const result = await response.json;

            navigate('/display', { state : result});
        } catch(err){
            setError(err.message);
        } finally {
            setIsLoading(false);
        }

        
    } */
    

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
                    <button type="submit">Search!</button>
                    <p></p>
                </form>
            </div>
        </div>
        

    );
}