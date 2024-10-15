const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequestModel = require("../model/connectionRequest");
const userRouter = express.Router();
const User = require("../model/user");


userRouter.get("/user/request/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        // Find connection requests where the logged-in user is the recipient
        const connectionRequests = await ConnectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", ["firstName", "lastName","photoUrl", "skills","age", "gender","about"]);

        if (!connectionRequests.length) {
            // If no requests are found, return 404
            return res.status(404).json({
                message: "No connection requests found",
                data: [],
            });
        }

        // Return success response with the connection requests data
        res.json({
            message: "Data fetched successfully",  
            data: connectionRequests,
        });
    } catch (err) {
        // Return 500 if there's a server error
        res.status(500).send("ERROR: " + err.message);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        // Find connections where the user is either the sender or the receiver of the request
        const connectionRequests = await ConnectionRequestModel.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" }
            ],
        })
        .populate("fromUserId", ["firstName", "lastName", "photoUrl", "skills", "age", "gender", "about"])
        .populate("toUserId", ["firstName", "lastName", "photoUrl", "skills", "age", "gender", "about"]);

       // Map connections, returning the correct user (the one who is not the logged-in user)
        const data = connectionRequests.map((request) => {
            if (request.fromUserId._id.equals(loggedInUser._id)) {
                return request.toUserId;  // If logged-in user initiated the request, return the other user
            }
            
            return request.fromUserId; 
            // Otherwise, return the user who initiated the request
        });

        // const data = connectionRequests.map((row) => row.fromUserId);

        res.json({ data});
    } catch (err) {
        res.status(500).send("ERROR: " + err.message);
    }
});

userRouter.get("/feed", userAuth, async(req,res) => {
    try {

        // loggedInUser should see all the user card (Excluding himself/herself)
        // also not his connections
        // also who ignored him/her 
        // also those user whom he/her send request once


        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page-1) * limit;



        const connectionRequests = await ConnectionRequestModel.find({

            $or: [{fromUserId: loggedInUser._id}, {toUserId:loggedInUser._id}],

        }).select("fromUserId  toUserId");

        const hideUsersFromFeed = new Set();

        connectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());

        });

        const users = await User.find({
            $and: [
                { _id: {$nin: Array.from(hideUsersFromFeed)}},
                {_id: { $ne: loggedInUser._id}},
            ],
        }).select(["firstName", "lastName", "photoUrl", "skills", "age", "gender", "about"]).skip(skip).limit(limit);

        res.send(users); 
        
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
        
    }
})


module.exports = userRouter;
