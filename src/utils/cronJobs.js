const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const { connectionRequestModel } = require("../models/connectionRequest");
const { run } = require("../utils/sendEmail")

cron.schedule("3 1 * * *", async () => {
    //sqend email to all people who got request the previos blcok
    try {
        const yesterday = subDays(new Date(), 0);

        const yesterdayStart = startOfDay(yesterday);
        const yesterdayEnd = endOfDay(yesterday);

        const pendingRequest = await connectionRequestModel.find({
            status: "intrested",
            createdAt: {
                $gte: yesterdayStart,
                $lt: yesterdayEnd
            }
        }).populate("fromUserId toUserId");

        const listofEmails = [...new Set(pendingRequest.map((req) => req.toUserId.emailId))]

        for (const email of listofEmails) {
            const res = await run("new friend request" + email);
        }


    } catch (err) {
        console.log(err);
    }
})