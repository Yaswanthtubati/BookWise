import React from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./components/Navbar";
import Body from "./components/Body";
import { Collection } from "./components/Collection";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Error from "./components/Error";
import Footer from "./components/Footer";
import BookDetails from "./components/BookDetails";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import MyCollection from "./components/MyCollection";


const AppLayout = () => {
    return(
        <>
        <Header />
        <Outlet />
        <Footer />
        </>
    );
}

const appRouter = createBrowserRouter([
    {
        path : '/',
        element : <AppLayout />,
        errorElement : <Error />,
        children : [
            {
                path : '/',
                element : <Body />
            },
            {
                path : '/collection',
                element : <Collection />
            },
            {
                path : '/book/:bookId',
                element : <BookDetails />
            },
            {
                path : '/profile',
                element : <Profile />
            },
            {
                path : '/mycollection',
                element : <MyCollection />
            },
        ]
    },
    {
        path : '/signup',
        element : <Signup />
    }
])


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);