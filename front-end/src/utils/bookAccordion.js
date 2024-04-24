import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
 
export function Bookacc() {
  const username = localStorage.getItem('name');
  const [openAcc1, setOpenAcc1] = useState(true);
  const [openAcc2, setOpenAcc2] = useState(true);
 
  const handleOpenAcc1 = () => setOpenAcc1((cur) => !cur);
  const handleOpenAcc2 = () => setOpenAcc2((cur) => !cur);
 
  return (
    <div className=" mr-10 mt-10 p-2">
      {!username && 
        <Accordion open={openAcc1}>
        <AccordionHeader onClick={handleOpenAcc1}>Want to add this book to your collection?</AccordionHeader>
        <AccordionBody>
            Login now and create your own collection, add various kinds of books to it. You can have a custom profile and manage your collection with ease.
        </AccordionBody>
        </Accordion>
      }
      <Accordion open={openAcc2}>
        <AccordionHeader onClick={handleOpenAcc2}>How to create my own collection? (For New users)</AccordionHeader>
        <AccordionBody>
          First create an account in the website and you get access to your custom profile.In your profile section you can create collections,manage them and edit your profile if needed. Explore various genres and add them to your favourites.
        </AccordionBody>
      </Accordion>
    </div>
  );
}