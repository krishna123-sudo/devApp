
## authrouter
- post /signup
- post /login
- post /logout

## profileRouter
- get /profile/view
- patch /profile/edit
- patch /profile/password    //homework

## connectionRequestRouter
- post /request/send/:status/:userId
<!-- - post /request/send/ignore/:userId -->

- post /request/review/accepted/:rewuestId
- post /request/review/rejected/:rewuestId

## userRouter
- get /user/request/recieved
- get /user/connection
- get /user/feed --gets you the profile of other user on platform


Status:igonre,intrested,accepted,rejected
