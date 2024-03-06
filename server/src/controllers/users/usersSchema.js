const Joi = require('joi');


const usersSchema = Joi.object({
    userid: Joi.number().required(),
    name: Joi.string().required()
});

const validateUser = (req, res, next) => {
    const { error } = usersSchema.validate(req.body)
    if(error){
        return res.status(400).json({error: "Error due to validation", body: error});

    }
    else{
        next();
    }
}


module.exports = validateUser;