import { useForm } from "react-hook-form";
// Component for entering the search parameters
export default function Form () {
    const { register, handleSubmit } = useForm();
    const onSubmit = handleSubmit((data) => {
        console.log(data);
    })

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value="Enter in phrase" {...register("phrase")}/>
                <label>Select Year Range: 
                    <input type="number" value="1920" {...register("startYear")}/> 
                    <input type="number" value="2025" {...register("endYear")} />
                </label>
                <button type="submit">Search!</button>
            </form>
        </div>
    );
}