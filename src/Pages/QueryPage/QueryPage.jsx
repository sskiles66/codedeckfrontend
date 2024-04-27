
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import MadeCards from "../ProfilePage/MadeCards";   //Make this a shared component

export default function QueryPage() {

    const { searchTerm } = useParams(); // Destructure 'q' parameter from useParams

    const [query, setQuery] = useState("");

    const [pages, setPages] = useState();

    useEffect(() => {
        setQuery(searchTerm)
    }, [searchTerm]);

    useEffect(() => {
        async function fetchPages() {
            const response = await axios.get(`http://localhost:4000/api/learningPage/get-pages-by-query/${searchTerm}`);
            console.log('Response:', response.data);
            setPages(response.data);
        }

        if (searchTerm){
            fetchPages();
        }
        
    }, [searchTerm]);

    return (
        <div className="queryPageContainer">
            <p>Query Page</p>
            <p>Results For: {query}</p>

            {pages && (
                <MadeCards cards={pages}/>
            )}
        </div>
    );
}