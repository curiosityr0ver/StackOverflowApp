const Joi = require('joi');


const commentsSchema = Joi.object({
    commentid: Joi.number().required(),
    userid: Joi.number().required(),
    aid: Joi.number().required(),
    description: Joi.string().required()
    // createdtimestamp: Joi.date().iso().required(),
    // updatedtimestamp: Joi.date().iso()
});

const validateComment = (req, res, next) => {
    const {error} = commentsSchema.validate(req.body);
    if(error){
        return res.status(400).json({error: "Error due to validation"});

    }
    else{
        next();
    }
}

module.exports = validateComment;