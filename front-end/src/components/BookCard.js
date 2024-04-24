import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Tooltip,
    Button
  } from "@material-tailwind/react";
import { Bookacc } from "../utils/bookAccordion";
import axios from 'axios';
   
function BookCard({ user_id, title, author, about, pyear, genre }) {

    const id = localStorage.getItem('id');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title : title,
        author : author,
        about : about,
        genre : genre,
        pyear : pyear,
    });

    useEffect(() => {
        setFormData({
            title: title,
            author: author,
            about: about,
            genre: genre,
            pyear: pyear,
        });
    }, [title, author, about, genre, pyear]);

    const addExistingBook = async (e) => {
        try{
            e.preventDefault();
            const response = await axios.post('http://localhost/bookwise_backend/bookController/addExistingBook.php',formData,{
                withCredentials : true
            })
            navigate('/profile');
        } catch(error) {
            console.log(error);
        }

    }

    return (
        <>
        <div className="flex items-center gap-10">
            <Card className="w-[24rem] overflow-hidden">
                <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="mt-3 ml-3 pl-2 pt-2 rounded-none"
                >
                <Typography variant="h4" className="capitalize" color="pink">
                    {title}
                </Typography>
                <Typography className="mt-1 capitalize" variant="small" >Genre : &nbsp;{genre}</Typography>
                </CardHeader>
                <CardBody>
                    <Typography variant="h6" color="blue-gray">
                        Summary
                    </Typography>
                    <Typography variant="paragraph" color="gray" className="mt-3 font-normal">
                        {about}
                    </Typography>
                </CardBody>
                <span className="ml-6 text-black">Author</span>
                <CardFooter className="flex items-center justify-between">
                <div className="flex items-center -space-x-3">
                    <Tooltip placement="right" className="capitalize" content={author}>
                    <Avatar
                        size="md"
                        variant="circular"
                        alt="Author"
                        src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg"
                        className="border-2 border-white hover:z-10"
                    />
                    </Tooltip>
                </div>
                <Typography className="font-normal">Published In : <span className="text-black">{pyear}</span></Typography>
                </CardFooter>
            </Card>
            <div>
                {(id && id !== user_id) && 
                <Button
                    size="md"
                    variant="gradient"
                    color="indigo"
                    onClick={addExistingBook}
                    className="group relative flex items-center gap-3 overflow-hidden pr-[72px]"
                >
                Add to Your Collection
                <span className="absolute right-0 grid h-full w-12 place-items-center bg-indigo-600 transition-colors group-hover:bg-indigo-700">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                    </svg>
                </span>
                </Button>}
            </div>
      </div>
      <Bookacc />
      </>
    );
  }

  export default BookCard;