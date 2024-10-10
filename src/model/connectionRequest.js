const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        enum: {
            values: ["ignore", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        }
    }
}, {
    timestamps: true, // this works fine
});

// Pre-save hook to check if the user is trying to send a request to themselves
connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;

    // Check if both IDs are defined and then compare
    if (connectionRequest.fromUserId && connectionRequest.toUserId &&
        connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        return next(new Error("Cannot send connection request to yourself"));
    }

    next(); // proceed to save if validation passes
});

const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel;
