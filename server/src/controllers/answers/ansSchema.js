const Joi = require('joi');


const ansSchema = Joi.object({
    aid: Joi.number().required(),
    userid: Joi.number().required(),
    qid: Joi.number().required(),
    description: Joi.string().required()
    // createdtimestamp: Joi.date().iso().required(),
    // updatedtimestamp: Joi.date().iso()
});

const validateAns = (req, res, next) => {
    const { error } = ansSchema.validate(req.body);
    if(error){
        return res.status(400).json({error: "Error due to validation"});

    }
    else{
        next();
    }
}

module.exports = validateAns;