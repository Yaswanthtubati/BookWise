import React,{ useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Textarea, Typography } from 
"@material-tailwind/react";
import axios from 'axios';

const UpdateBook = ({ bookId }) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const [formData, setFormData] = useState({
        title : '',
        author : '',
        genre : '',
        pyear : '',
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost/bookwise_backend/bookController/updateBook.php', {
                title: formData.title,
                author: formData.author,
                genre: formData.genre,
                pyear: formData.pyear,
                bookId: bookId,
            }, {
                withCredentials: true
            });
            window.location.reload('/');
        } catch (error) {
            console.error('Error Updating book:', error);
        }
    }
    

    return(
        <div className="m-2">
            <Button className="w-[130px]" color="indigo" onClick={handleOpen}>Update</Button>
            <form>
                <Dialog open={open} size="xs" handler={handleOpen}>
                    <div className="flex items-center justify-between">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-3 h-5 w-5 rounded-md p-2 hover:bg-pink-300 hover:text-white" onClick={handleOpen} >
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <DialogBody>
                    <div className="grid gap-3">
                        <Typography color="blue-gray" variant="h6">Title of the Book</Typography>
                        <Input label="Title" name="title" onChange={handleChange} />
                        <Typography color="blue-gray" variant="h6">Author</Typography>
                        <Input label="Author" name="author" onChange={handleChange} />
                        <Typography color="blue-gray" variant="h6">Genre</Typography>
                        <Input label="genre" name="genre" onChange={handleChange} />
                        <Typography color="blue-gray" variant="h6">Published In :</Typography>
                        <Input label="Year" name="pyear" onChange={handleChange} />
                    </div>
                    </DialogBody>
                    <DialogFooter className="space-x-2">
                    <Button variant="text" color="gray" onClick={handleOpen}>
                        cancel
                    </Button>
                    <Button variant="gradient" color="gray" onClick={handleUpdate}>
                        Update Book
                    </Button>
                    </DialogFooter>
                </Dialog>
            </form>
        </div>
    );
}

export default UpdateBook;