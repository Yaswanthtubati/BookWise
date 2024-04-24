import React, { useState, useEffect } from "react";
import { Navbar, Collapse, Typography, IconButton, Popover, PopoverHandler, PopoverContent, } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Login from "./Login";
import { Menu } from "./VerifiedMenu";

function NavList() {

  const username = localStorage.getItem('name');
  const [openPopover, setOpenPopover] = React.useState(false);
 
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <Link to = "/" className="flex items-center p-2 rounded-lg hover:bg-blue-gray-700 transition-colors">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <Link to = "/collection" className="flex items-center p-2 rounded-lg hover:bg-blue-gray-700 transition-colors">
          Collection
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
              {username ? ( 
            <Link to = "/profile" className="flex items-center p-2 rounded-lg hover:bg-blue-gray-700 transition-colors">
            Profile
          </Link>
            ) : (
              <Popover open={openPopover} handler={setOpenPopover} placement="bottom">
              <PopoverHandler {...triggers}>
              <Typography
                  as="li"
                  variant="small"
                  color="white"
                  className="p-1 font-medium"
                >
                  <Link to='#' className="flex items-center p-2 rounded-lg hover:bg-blue-gray-700 transition-colors">
                    Profile
                  </Link>
                </Typography>
              </PopoverHandler>
              <PopoverContent {...triggers}>
                Login to access
              </PopoverContent>
            </Popover>
            )}
      </Typography>
      {username ? <Menu /> : <Login />}
    </ul>
  );
}
 
export function Header() {
  const [openNav, setOpenNav] = useState(false);
 
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);
 
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
 
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
 
  return (
    <Navbar variant="gradient" color="blue-gray" className="mx-auto max-w-full rounded-none from-blue-gray-900 to-blue-gray-800 px-6 py-3">
      <div className="flex items-center justify-between text-white">
        <div className="flex">
        <Square3Stack3DIcon className="h-[18px] w-[18px] mt-[10px] mr-2 text-pink-300" />
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 italic text-pink-300"
          >
            BookWise
          </Typography>
        </div>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}