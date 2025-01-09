import { useLocation } from "react-router-dom";
// useEffect = perform API requests. Renders immediately
// useState = prepare a state in which the data is returned. Store returned data in React local state.


export default function DisplayPage(){
    // Accessed what was passed through navigate. 
    const { state } = useLocation();
    // Creating the correct URL to fetch from, including necessary query parameters

    if(!state?.collection?.items) {
        return <div>No results found</div>;
    }
    
    //To return: 
    return (
        <div>
            <h1>NASA Image Results</h1>
            {state.collection.items.map((item: any, index: number) => {
                const imageData = item.data[0];
                const imageUrl = item.links?.[0]?.href;

                return (
                    <div key={index} style={{
                        margin: '20px',
                        padding: '15px',
                        border: '1px solid #ccc',
                        borderRadius: '5px'
                    }}>
                        {imageUrl && (
                            <img 
                                src={imageUrl} 
                                alt={imageData.title}
                                style={{ maxWidth: '300px', marginBottom: '10px' }}
                            />
                        )}
                        <h2 style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                            {imageData.title}
                        </h2>
                        <p style={{ marginBottom: '5px' }}>
                            {imageData.description}
                        </p>
                        <p style={{ color: '#666' }}>
                            Date Created: {new Date(imageData.date_created).toLocaleDateString()}
                        </p>
                    </div>
                );

            })}
        </div>
    );
}