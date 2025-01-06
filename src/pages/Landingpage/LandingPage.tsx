import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

import "./LandingPage.css";
import image from "C:/Users/imiri/Desktop/ImirieBilley-h4i-assessment-Spring25/src/assets/background.jpg";
import { useEffect } from "react";

// Component for entering the search parameters
export default function LandingPage () {
    const { register, reset, handleSubmit } = useForm();
    const navigate = useNavigate();
    const { state } = useLocation();

    const onSubmit = handleSubmit((data) => {
        navigate("/display", { state: data });
    });

    useEffect(() => {
        reset(state);
    }, []);


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

                <form onSubmit={onSubmit}>
                    <input type="text" placeholder="Enter in phrase" {...register("phrase")}/><br></br>
                    <label>Select Year Range: 
                        <input type="number" value="1920" {...register("startYear")}/> 
                        <input type="number" value="2025" {...register("endYear")} />
                    </label><br></br>
                    <button type="submit">Search!</button>
                </form>
            </div>
        </div>
    );
}