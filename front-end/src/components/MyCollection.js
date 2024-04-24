import React, { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import axios from "axios";
import UpdateBook from "./updateBook";

function Mycard({ id, title, author, genre, about, pyear }) {

    const bookId = id;

    async function handleDelete() {
        try {
            const response = await axios.post('http://localhost/bookwise_backend/bookController/deleteBook.php',{
                bookId : bookId,
            }, {
                withCredentials: true
            });
            console.log(response);
            window.location.reload('/');
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    }    

  return (
    <Card className="mt-6 mx-4 flex flex-col bg-blue-gray-300 bg-opacity-50" style={{ width: "500px" }}>
      <CardBody className="flex-grow">
        <Typography variant="h5" color="black" className="mb-2">
          {title}
        </Typography>
        <Typography className="text-black">
          <span className="text-orange-900">Genre</span> : {genre}
        </Typography>
        <Typography className="text-black pt-2">
          Summary
        </Typography>
        <Typography className="text-gray-600">
          {about}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        Published In : <span className="text-black">{pyear}</span>
        <div className="flex pt-2">
          <UpdateBook bookId={bookId} />
        </div>
        <Button onClick={handleDelete} color="pink" className="ml-2 hover:bg-red-900">Delete Book</Button>
      </CardFooter>
    </Card>
  );
}

const MyCollection = () => {

  const [myBooks, setMyBooks] = useState([]);


  useEffect(() => {
    getMyBooks();
  },[])

  async function getMyBooks() {
    try{
        const response = await axios.get('http://localhost/bookwise_backend/bookController/getMyBooks.php',{
            withCredentials : true
        });
        console.log(response?.data);
        setMyBooks(response?.data);
    } catch(error) {
        console.log(error);
    }
  }

  return (
    <>
    <h1 className="mt-6 ml-10 font-bold italic text-xl text-indigo-800">My Collection :</h1>
    <div className="flex p-4 shadow-sm rounded-lg overflow-x-scroll no-scrollbar" style={{ width: "1100px" }}>
      {/* Wrap Dcard components in a container div */}
      <div className="flex">
      {myBooks.map((book, index) => {
        return <Mycard key={index} { ...book } />
      })}
      </div>
    </div>
    </>
  );
};

export default MyCollection;
