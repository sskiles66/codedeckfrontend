
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Cards from "../../SharedComponents/Cards";
import returnBaseUrl from "../../getUrl";

export default function QueryPage() {

    const { searchTerm } = useParams(); // Destructure 'q' parameter from useParams
    const [query, setQuery] = useState("");
    const [pages, setPages] = useState();

    // set query state to whatever search term is (from url param)
    useEffect(() => {
        setQuery(searchTerm)
    }, [searchTerm]);

    // Every time search term changes, get pages for that search term. Display will change when pages is different
    useEffect(() => {
        async function fetchPages() {
            const response = await axios.get(`${returnBaseUrl()}/api/learningPage/get-pages-by-query/${searchTerm}`);
            console.log('Response:', response.data);
            setPages(response.data);
        }
        if (searchTerm) {
            fetchPages();
        }
    }, [searchTerm]);

    return (
        <div className="queryPageContainer">
            {pages && (
                <Cards cards={pages} title={`Results For: ${query}`} />
            )}
        </div>
    );
}