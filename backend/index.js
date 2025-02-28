import express from "express"
import cors from "cors"
import mongoose from "mongoose";

import { clerkMiddleware, clerkClient, requireAuth, getAuth } from '@clerk/express'

import ImageKit from "imagekit"
import Chat from "./models/chat.js";
import UserChats from "./models/userChats.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials: true

}))

app.use(express.json())

app.use(clerkMiddleware())

const connect = async()=>{
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error)
    }
}

const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY
})

app.get("/api/upload", (req,res)=>{
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
})

// app.get("/api/test", requireAuth(), async (req,res)=>{
//     const { userId } = getAuth(req)

//     const user = await clerkClient.users.getUser(userId);

//     res.send(userId)
// })

app.get("/api/userchats", requireAuth(), async(req,res)=>{
    const { userId } = getAuth(req)

    try{
        const userChats = await UserChats.find({userId});
        res.status(200).send(userChats[0].chats);

    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching userchats!");
    }
})

app.get("/api/chats/:id", requireAuth(), async(req,res)=>{
    const { userId } = getAuth(req)

    try{
        const chat = await Chat.findOne({_id:req.params.id, userId})
        res.status(200).send(chat);

    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching chat!");
    }
})

app.post("/api/chats", requireAuth(), async (req,res)=>{
    const { userId } = getAuth(req)
    const { text} = req.body

    try {
        //create a new chat
        const newChat = new Chat({
            userId: userId,
            history: [{role:"user", parts:[{text}]}]
        });

        const savedChat = await newChat.save();

        //check if the userchats exists
        const userChats = await UserChats.find({userId:userId});

        //if doesn't exists create a new one and add the chat in the chats array
        if(!userChats.length){
            const newUserChats = new UserChats({
                userId: userId,
                chats:[
                    {
                        _id: savedChat._id,
                        title: text.substring(0,40)
                    
                    }
                ]
            })

            await newUserChats.save();

        } else{
            // if exists, push the chat to the existing array
            await UserChats.updateOne({userId: userId},{
                $push:{
                    chats:{
                        _id:savedChat._id,
                        title: text.substring(0,40)
                    }
                }
            })
        }

        res.status(201).send(newChat._id)



    } catch (error) {
        console.log(error);
        res.status(500).send("Error creating chat!")
    }
})

app.put("/api/chats/:id", requireAuth(), async(req,res)=>{
    const { userId } = getAuth(req)

    const {question, answer, img} = req.body;

    const newItems = [
        ...(question 
        ?  [{role: "user", parts: [{text:question}], ...(img && {img})}]
            : []),
        {role: "model", parts: [{text:answer}]}
    ]
    try{
        
        const updatedChat = await Chat.updateOne({_id:req.params.id, userId},{
            $push:{
                history:{
                    $each: newItems
                }
            }
        })

        res.status(200).send(updatedChat);

    } catch (error) {
        console.log(error);
        res.status(500).send("Error adding conversation");
    }
})

app.listen(port, ()=>{
    connect()
    console.log("Server running on")
})