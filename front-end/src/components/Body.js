import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { Acc } from "../utils/accordion";

const Body = () => {

    const username = localStorage.getItem('name');

    
    return(
        <div>
            <div className="mx-10 mt-10 p-10 w-[700px]">
                <h1 className="text-6xl mb-1 p-4 text-indigo-800 slide-in">Welcome {username ? <span className="capitalize">{username}</span> : <span>User</span>}</h1>
                <h1 className="text-3xl m-2 p-4 text-blue-gray-400">Organize Your Library with ease & effortlessly Manage Your Book Collection</h1>
            </div>
            <div className="ml-24 mb-5 flex">
                <Link to='/collection'><Button size="md" variant="gradient" color="pink"
                     className="group relative flex ml-1 mr-4 items-center gap-3 overflow-hidden " >
                    View all Books
                </Button></Link>
              {username && 
                <Link to='/profile'><Button size="md" variant="gradient" color="indigo"
                     className="group relative flex ml-1 items-center gap-3 overflow-hidden pr-[72px]" >
                    My Collection
                    <span className="absolute right-0 grid h-full w-12 place-items-center bg-indigo-600 transition-colors group-hover:bg-indigo-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth={2} stroke="currentColor" className="h-5 w-5"
                        >
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                        />
                        </svg>
                    </span>
                </Button></Link>}
            </div>
            <div className="mx-5 p-10 w-[700px]">
                <Acc />
            </div>
        </div>
    );
}

export default Body;