const mongoose = require("mongoose");

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
        required: true,
        enum: {
            values: ["ignore", "intrested", "accepted", "rejected"],
            message: `{VALUE} is incoorect type`
        }
    }
}, { timestamps: true })


//compound index to make query fast
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

// connectionRequestSchema.pre("save", function (next) {
//     if (this.fromUserId.equals(this.toUserId)) {
//         // return next(new Error("Cannot send connection request to yourself"));
//         throw new Error("Cannot send connection request to yourself");
//     }
//     next();
// });


const connectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = { connectionRequestModel };