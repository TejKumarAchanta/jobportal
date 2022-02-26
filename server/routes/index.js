const express = require('express');
const router = express.Router();
const Job = require('../Model/Job');
const Joi = require('joi');


router.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'Server is up and running'
  });
});


router.post('/createJob', async (req, res) => {

  const jobSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    skills: Joi.array().items(Joi.string()),
  });

  const { error } = jobSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: false,
      message: error.message,
    });
  }

  try {

    const job = await Job.create(req.body);

    return res.status(200).json({
      error: false,
      data: job
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(200).json({
        error: true,
        message: "Title already exists"
      });
    }
    return res.status(200).json({
      error: true,
      data: error.code
    });
  }
});


router.get('/getJobs', async (req, res) => {

  let { searchItemKey = '' } = req.query;

  try {
    const jobs = await Job.find({
      $or: [
        { title: { $regex: searchItemKey, $options: "i" } },
        { skills: { $regex: searchItemKey, $options: "i" } },
      ],
    })
    
    return res.status(200).json({
      error: false,
      data: jobs
    });
  }
  catch (err) {
    return res.status(500).json({
      error: true,
      data: err
    });
  }
});



module.exports = router;
