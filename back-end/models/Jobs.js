const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  jobType: { type: String, required: true },
  jobCategory: { type: String, required: true },
  jobTags: { type: String, required: true },
  jobExperience: { type: String, required: true },
  jobQualification: { type: String, required: true },
  requiredSkills: { type: String, required: true },
  jobRole: { type: String, required: true },
  jobCity: { type: String, required: true},
  email: { type: String, required: true},
  phone: { type: String, required: true},
  postedOn:{type:Date,required:true},
  lastDate:{type:Date,required:true},
  requirements: { type: String, required: true},
  responsibilities: { type: String, required: true},
  jobDescription: { type: String, required: true},
  salary:{type:String,required:true},
  applicationUrl:{type:String,required:true}
});

module.exports = mongoose.model('jobs', JobSchema);