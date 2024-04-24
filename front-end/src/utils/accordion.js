import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
 
export function Acc() {
  const username = localStorage.getItem('name');
  const [openAcc1, setOpenAcc1] = useState(false);
  const [openAcc2, setOpenAcc2] = useState(false);
 
  const handleOpenAcc1 = () => setOpenAcc1((cur) => !cur);
  const handleOpenAcc2 = () => setOpenAcc2((cur) => !cur);
 
  return (
    <div className=" mx-10 p-2">
      {!username && 
        <Accordion open={openAcc1}>
        <AccordionHeader onClick={handleOpenAcc1}>Want to access more Features?</AccordionHeader>
        <AccordionBody>
            Register to our website and create your own collection.You can have a custom profile and manage your collection with ease.<span><Link to="/signup" className="text-black font-bold hover:text-red-700">&nbsp;Register now</Link></span>
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