
## Auth router
POST/signup
POST/login
POST/logout

## profile router
GET/profile/view
PATCH/profile/edit
PATCH/password/edit

## connectionRequestRouter
POST/request/send/interested/:userId
POST/request/send/rejected/:userId
POST/request/review/accepted/:requestId
POST/request/review/rejected/:requestId


## userRouter
GET/user/connections
GET/user/requests
GET/user/feed - gets other users profile 


status : ignore,insterested,accepted,rejected