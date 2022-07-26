const {postSchema} = require("./schemas");
const ExpressError = require("./utils/ExpressError")

module.exports.validatePost = (req,res,next) => {
    const {error} = postSchema.validate(req.body)
    if(error){
        const msg = error.details.map((e1)=>e1.message).join(',');
        throw new ExpressError(msg,400);
    }else{
        next();
    }

}