
function adminAuth(req,res,next){
    const token = "abc"
    const isAuthrosiedAdmin = token ==="abc"

    if(!isAuthrosiedAdmin){
        res.status(401).send("you are not authorised admin ....")
    }
    else{
        next()
    }
}

function userAuth(req,res,next){
    const token = "xyz"
    const isAuthrosiedUser = token ==="xyz"

    if(!isAuthrosiedUser){
        res.status(401).send("you are not valid user ....")
    }
    else{
        next()
    }
}

module.exports = {adminAuth,userAuth}