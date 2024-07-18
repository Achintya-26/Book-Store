import mongoose from "mongoose";
import { Book } from "../models/bookModel.js";
import { mongoDBURL } from "../config.js";

const titles = [
    "The Catcher in the Rye", "To Kill a Mockingbird", "1984", "Pride and Prejudice", 
    "The Great Gatsby", "The Hobbit", "Fahrenheit 451", "Moby Dick", 
    "War and Peace", "The Lord of the Rings", "Harry Potter and the Philosopher's Stone",
    "The Da Vinci Code", "The Hunger Games", "The Shining", "Brave New World"
]

const authors = [
    "J.D. Salinger", "Harper Lee", "George Orwell", "Jane Austen", 
    "F. Scott Fitzgerald", "J.R.R. Tolkien", "Ray Bradbury", "Herman Melville", 
    "Leo Tolstoy", "J.R.R. Tolkien", "J.K. Rowling", "Dan Brown", 
    "Suzanne Collins", "Stephen King", "Aldous Huxley"
]


mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("Connected open!")
})

.catch((err)=>{
    console.log(err);
})

const seedsDb=async function(){
    await Book.deleteMany({});
    for(let i=0;i<50;i++){
        const randomBook=Math.floor(Math.random()*titles.length);
        const randomYear=Math.floor(Math.random()*30)+1990;
        const book=new Book({title:titles[randomBook],author:authors[randomBook],publishYear:randomYear});
        await book.save();
    }
}

seedsDb().then(()=>{
    console.log("Books added!");
    mongoose.connection.close();
})