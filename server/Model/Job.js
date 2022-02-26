const { model, Schema } = require('mongoose');


const JobSchema = Schema({
    title: {
        type: 'string',
        require: true,
        unique: true,
    },
    description: {
        type: 'string',
    },
    skills: [String]
}, {
    timestamps: true,
    versionKey: false,
})


const Job = model('Job', JobSchema);

module.exports =Job;