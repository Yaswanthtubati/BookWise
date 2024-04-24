import React,{ useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import axios from 'axios';
import BookCard from "./BookCard";


const BookDetails = () => {

    const [bookData, setBookData] = useState({});

    const params = useParams();
    //const { bookId } = params;

    useEffect(() => {
        getBookDetails();
    },[]);

    async function getBookDetails() {
        const response = await axios.post('http://localhost/bookwise_backend/bookController/getSpecificBook.php', params);
        console.log(response?.data[0]);
        setBookData(response?.data[0])
    }

    return(
        <div className="flex bg-blue-gray-50">
            <Sidebar />
            <div className="px-4 pt-4 mx-20 my-10">
                <BookCard {...bookData} />
            </div>
        </div>
    );
}

export default BookDetails;