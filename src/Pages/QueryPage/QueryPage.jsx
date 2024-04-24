
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

export default function QueryPage() {

    const { searchTerm } = useParams(); // Destructure 'q' parameter from useParams

    const [query, setQuery] = useState("");

    useEffect(() => {
        setQuery(searchTerm)
    }, [searchTerm]);

    return (
        <div className="placeholder">
            <p>Query Page</p>
            <p>Results For: {query}</p>
        </div>
    );
}