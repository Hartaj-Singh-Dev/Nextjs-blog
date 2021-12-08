const express = require('express');
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({path:"./config.env"})

const port = process.env.PORT
const url = process.env.DATABASE

mongoose.connect(url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{console.log("Databse connection succesfull 🚀")}).catch((err)=>{console.log(err);})

app.use(express.json())
app.use(cors({origin:"http://localhost:3000" , credentials:true }))

//Schema

const blogSchema = new mongoose.Schema({
    blogposts:[
        {
            title:{
                type:String
            },
            date:{
                type:String
            },
            content:{
                type:String,
            },
            imageLinks1:{
                type:String
            },
            imageLinks2:{
                type:String
            },
            imageLinks3:{
                type:String
            },
            imageLinks4:{
                type:String
            },
            blogKeyword1:{
                type:String
            },
            blogKeyword2:{
                type:String
            },
            blogKeyword3:{
                type:String
            },
            blogKeyword4:{
                type:String
            }
        },
    ]
})


blogSchema.methods.addBlog = async function(title , date , content , imageLinks1 , imageLinks2 ,imageLinks3 ,imageLinks4 ,blogKeyword1 ,blogKeyword2 ,blogKeyword3 ,blogKeyword4){
    try{
        this.blogposts = await this.blogposts.concat({title , date , content , imageLinks1 , imageLinks2 ,imageLinks3 ,imageLinks4 ,blogKeyword1 ,blogKeyword2 ,blogKeyword3 ,blogKeyword4})
        await this.save()
        return this.blogposts
    }catch(err){
        console.log(err);
    }
}


const blogarrays = new mongoose.model("blogarrays",blogSchema)

//Schema

app.get("/", (req,res)=>{
    res.json({Response:"Yes API is working 🚀"})
})


app.get("/allPosts",async (req,res)=>{
    try{
        const allBlogData = await blogarrays.findOne({_id:"60be21affae8ae5ec82b0523"})
        res.status(200).json({data:allBlogData})
    }catch(err){
        console.log(err);
    }
})


app.post("/createPost",async (req,res)=>{
    try{
        const {title , date , content , imageLinks1 , imageLinks2 ,imageLinks3 ,imageLinks4 ,blogKeyword1 ,blogKeyword2 , blogKeyword3 ,blogKeyword4  } = req.body
        const blogOneArray = await blogarrays.findOne({_id:"60be21affae8ae5ec82b0523"})
        await blogOneArray.addBlog(title , date , content , imageLinks1 , imageLinks2 ,imageLinks3 ,imageLinks4 ,blogKeyword1 ,blogKeyword2 , blogKeyword3 ,blogKeyword4)
        res.status(200).json({Message:"Data Added and it's all working"})
        
    }catch(err){
        console.log(err)
    }
})


app.listen(port,()=>{console.log(`Server running on port no ${port}`)})