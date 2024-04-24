import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

 
function Footer() {
  return (
    <footer className="w-full px-8 py-4 bg-blue-gray-400">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-blue-gray-400 text-center md:justify-between">
      <Square3Stack3DIcon className="h-[30px] w-[30px] mt-[10px] mr-2 text-white" />
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography as="a" href="#" color="blue-gray" className="font-normal transition-colors text-white hover:text-black focus:text-black" >
              About Us
            </Typography>
          </li>
          <li>
            <Link to='/'>
              <Typography color="blue-gray" className="font-normal transition-colors text-white hover:text-black focus:text-black" >
                Dashboard
              </Typography>
            </Link>
          </li>
          <li>
            <Typography as="a" href="#" color="blue-gray" className="font-normal transition-colors text-white hover:text-black focus:text-black" >
              Contribute
            </Typography>
          </li>
          <li>
            <Typography as="a" href="#" color="blue-gray"
              className="font-normal transition-colors text-white hover:text-black focus:text-black"
            >
              Contact Us
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="my-4 border-blue-gray-50" />
      <Typography color="white" className="text-center font-normal">
        &copy; Book Management
      </Typography>
    </footer>
  );
}

export default Footer;