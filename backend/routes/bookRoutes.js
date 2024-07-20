import express from "express";
import { Book } from "../models/bookModel.js";
const router=express.Router();

router.post('/',async(req,res)=>{
    try {
        if(!req.body.title){
            return res.status(400).send({message:'Send all required fields: title, author, publishYear'})
        }
        const newBook={
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear
        } 
        const book=await Book.create(newBook);
        return res.status(201).send(book);
    }catch (error) {
        console.log(error);
    }
})


// Route to get one book from the database
router.get('/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const book=await Book.findById(id);
        if(!book) throw Error;
        res.status(200).json(book);
    } catch (error) {
        res.status(500).send("Cannot find any book with the given id :(")
        
    }
})

// Route to update a book

router.put('/:id',async(req,res)=>{
    console.log('Hit');
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        )return res.status(400).send({ message:"Send all required fields: title, author, publishYear"});
        const {id}=req.params;
        const result=await Book.findByIdAndUpdate(id,req.body);
        if(!result) return res.status(404).send({message:'Book not found!'}) 
        return res.status(200).send({message:'Book Updated Successfully'});        
    } catch (error) {
        res.status(500).send({message:error.message});
    }
})

// Route to delete a book
router.delete('/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const result=await Book.findByIdAndDelete(id);
        if(!result) return res.status(404).send({message:"Book not found!"});
        return res.status(200).send({message:'Book deleted successfully!'});
    } catch (error) {
        return res.status(500).send({message:error.message});
    }

})

// Route to get all books from databse
router.get('/',async(req,res)=>{
    try {
        const books=await Book.find({});
        return res.status(200).json({
            count:books.length,
            data:books
        });
    }
    catch (error) {
        res.status(500).send({message:error.message});        
    }
})

export default router;