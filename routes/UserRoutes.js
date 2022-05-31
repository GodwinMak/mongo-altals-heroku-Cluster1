const router = require("express").Router();
const {register, login, setAvatar,getAllUser} = require("../controllers/UserController")

// const
router.get('/',(req,res)=>{
    res.send("Sever is up and running")
})
router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id",setAvatar)
router.get("/allusers/:id",getAllUser)



module.exports= router;