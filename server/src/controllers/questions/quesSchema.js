const Joi = require('joi');


const quesSchema = Joi.object({
    qid :Joi.number().required(),
    userid :Joi.number().required(),
    title :Joi.string().min(1).required(),
    description :Joi.string().required()
    // createdtimestamp: Joi.date().iso().required(),
    // updatedtimestamp: Joi.date().iso()
});

const validateQues = (req, res, next) => {
    const {error} = quesSchema.validate(req.body);
    if(error){
        return res.status(400).json({error: "Error due to validation"});

    }
    else{
        next();
    }
}
module.exports = validateQues;