
  const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const env = require('dotenv');
const User = require('./models/User');
const { check, validationResult } = require('express-validator');
const bcrypt=require("bcrypt");
const Intern=require('./models/Candidate')
const AcceptedIntern=require('./models/Intern')
const axios=require('axios')
const cron=require("node-cron")
const HrRequest=require('./models/HrRequest')
const Hr=require('./models/hr')
const Jobs=require('./models/Jobs')
const crypto=require('crypto')
const PastJobs=require("./models/PastJobs")
const http = require('http');
const socketIo = require('socket.io');
const Server=require('socket.io')
const app = express();
//const server = http.createServer(app);
//console.log(server)

env.config();
const PORT = process.env.PORT || 5000; // Change port number to 5000 or another available port

app.use(bodyParser.json());
app.use(cors());
var server=app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
var io=require('socket.io')(server,{cors:{origin:'*'}})

//const io = Server(5000,{cors:{origin:'*'}});
const ZEPTOMAIL_API_URL = 'https://api.zeptomail.in/v1.1/email';
const ZEPTOMAIL_API_KEY = 'Zoho-enczapikey PHtE6r0EFLjr3jMsp0QAt/+wE8TyN40tr+hmKFMVsIgUXqMFTk0Bqdl6wDPiqU8jXPJHR/ObzN5ttLOe5+ONdGrtZG1NXmqyqK3sx/VYSPOZsbq6x00etFUdcE3aUIbvetFq0ifQvdbcNA==';

// MongoDB connection
const url = process.env.MONGODB_URI; // Ensure this environment variable is correctly set
const connectionParams = {useNewUrlParser: true,useUnifiedTopology: true};
//io socket
io.on('connection', (socket) => {
  console.log('a user connected');

  // Watch for changes in the Intern collection
  Intern.watch().on('change', async (change) => {
    try {
      const interns = await Intern.find();
      io.emit('internRequestsUpdate', interns);
    } catch (error) {
      console.error('Error fetching intern requests:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


const createJob = (jobDetails) => {
  const jobId = crypto.randomUUID(); // Generate a unique job ID
  return {
    ...jobDetails,
    jobId, // Add the job ID to the job details
  };
};


mongoose.connect(url, connectionParams)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err.message}`);
  });

  const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');

  const changeStream = db.collection('intern-requests').watch();

  changeStream.on('change', async (change) => {
    console.log('Change detected:', change);
    if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
      try {
        const candidates = await Intern.find();
        console.log("New candidates",candidates)
        io.emit('internRequestsUpdate', candidates);
      } catch (err) {
        console.error('Error fetching updated candidates:', err);
      }
    }
  });
});


io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
    
//Email sending function
  const SendEmail=async(email)=>{
      //console.log(email)
      const emailBody={"from": { "address": "support@qtnext.com",  "name": "Support"},
            "to": [{"email_address": {"address": "naveensathyavanamoju593@gmail.com"}}],
            "subject":"Account registration successful",
            "htmlbody":`<div><b> Your registration is successfully completed, Please login your account <a href="http://localhost:3000/login">here</a></b></div>`}
  try {
    const response = await axios.post(ZEPTOMAIL_API_URL, emailBody, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': ZEPTOMAIL_API_KEY
      }
    });
    console.log("Email sent")
    //console.log(response)
  } catch (error) {
    console.log("Error sending email",error);
  }
}


const moveExpiredJobs = async () => {
  try {
    const today = new Date();
    console.log("Cron runned")
    const expiredJobs = await Jobs.find({ lastDate: { $lt: today } });
    console.log(expiredJobs)
    for (const job of expiredJobs) {
      const pastJob = new PastJobs({
        ...job.toObject(),
        movedOn: today, // Add movedOn field
      });

      await pastJob.save();
      await Jobs.deleteOne({ _id: job._id });
    }

    console.log(`${expiredJobs.length} jobs moved to PastJobs collection.`);
  } catch (error) {
    console.error('Error moving expired jobs:', error);
  }
};

// Schedule the task to run daily at midnight
cron.schedule('17 10 * * *', moveExpiredJobs);

app.post('/send-email', async (req, res) => {
      const{email,otp}=req.body
      console.log(email,otp)
      console.log("email sending")
      const emailBody={"from": { "address": "support@qtnext.com",  "name": "Support"},
              "to": [{"email_address": {"address": `${email}`}}],
              "subject":"Account Confirmation",
              "htmlbody":`<div><b> You otp for email verification is ${otp}</b></div>`}
    try {
      const response = await axios.post(ZEPTOMAIL_API_URL, emailBody, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': ZEPTOMAIL_API_KEY
        }
      });
      console.log("Email sent")
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(error.response ? error.response.status : 500).send(error.message);
    }
  });


app.get("/users",async (req, res) => {
    try {
        const username='naveenvanamoju'
        console.log("api")
        const user = await User.findByOne({username:username}).select('-password')
        console.log(user)
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
})

//API for intern registration requests from HR account
app.get("/intern-requests",async(req,res)=>{
  try{
    const intern=await Intern.find()
    io.emit('internRequestsUpdate', intern);
    res.status(200).json(intern)
  }catch(err){
    res.status(500).json({message:"Server error"})
  }     
})

app.get("/view-jobs",async(req,res)=>{
  try{
    const jobs=await Jobs.find()
    console.log(jobs)
    res.status(200).json(jobs)
  }catch(err){
    res.status(500).json({message:"Server error"})
  }     
})

app.get("/past-jobs",async(req,res)=>{
  try{
    const jobs=await PastJobs.find()
    console.log(jobs)
    res.status(200).json(jobs)
  }catch(err){
    res.status(500).json({message:"Server error"})
  }     
})


//API for HR registration requests from Super Admin account
app.get("/hr-requests",async(req,res)=>{
  try{
    const hr=await HrRequest.find()
    res.status(200).json(hr)
  }catch(err){
    res.status(500).json({message:"Server error"})
  }     
})

//API to accept intern requests from HR account
app.post("/accept-interns",async(req,res)=>{
      const candidates=req.body
      console.log("Candidates:",candidates)
      for (const candidate of candidates){
        console.log("Candidate:",candidate)
        const acceptedIntern=new AcceptedIntern({address:candidate.address,
          altmobileno:candidate.altmobileno,
          batchno:candidate.batchno,
          belongedToVasaviFoundation:candidate.belongedToVasaviFoundation,
          modeOfInternship:candidate.modeOfInternship,
          candidateId:candidate.candidateId,
          domain:candidate.domain,
          email:candidate.email,
          fullName:candidate.fullName,
          mobileno:candidate.mobileno
        })
  
        try {
          
          
          await acceptedIntern.save();
          const result = await Intern.deleteOne(candidate)
          if (result.deletedCount === 1) {
            console.log("Successfully deleted one document.");
  
          } else {
            console.log("No documents matched the query. Deleted 0 documents.");
          }
          io.emit('internRequestsUpdate', await Intern.find());
          res.status(201).json({ message: 'Intern created successfully' });
          SendEmail(acceptedIntern.email)
      } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Server Error' });
      }
  
      }
})

//API to reject intern requests from HR account
app.post("/reject-interns",async (req,res)=>{
  const candidates=req.body
  for(const candidate of candidates){

    const result = await Intern.deleteOne(candidate)
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
      res.status(201).json({ message: 'Intern rejected successfully' });
  
    } else {
      console.log("No documents matched the ");
      res.status(500).json({message:"Server Error"})
    }
  }
 
})

//API for accepting HR requests from Super Admin account
app.post("/accept-hr",async(req,res)=>{
  const candidate=req.body
  //console.log(candidate)
  const acceptedHr=new Hr({fullName: candidate.fullName,
    email: candidate.email,
    mobileNo: candidate.mobileNo})


  try {
    
    
    await acceptedHr.save();
    const result = await HrRequest.deleteOne(candidate)
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");

    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
    res.status(201).json({ message: 'Intern created successfully' });
    SendEmail(acceptedHr.email)
} catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
}


})



//API for HR registration
app.post("/signup-hr", async(req,res)=>{
        const{fullName,email,mobileNo}=req.body;
        //console.log(fullName,email,mobileNo)
        const errors = validationResult(req);
        console.log(req.body)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
      
        const record = await HrRequest.findOne({
          $or: [{ email: email }, { mobileNo: mobileNo }]});

          const existingHr = await Hr.findOne({
            $or: [{ email: email }, { mobileNo: mobileNo }]});
    
        console.log(record);
      if(!record && !existingHr){
        console.log("entered")
       const newHr = new HrRequest({
            fullName: fullName,
            email: email,
            mobileNo: mobileNo,
        });
        await newHr.save();
        res.status(201).json({ message: 'Hr registeration request Submitted' });
      }else{
        if(existingHr){
          res.status(400).json({message:"Hr already registered, Please login"})
        }else{
          res.status(400).json({message:"Hr registration request already exists"})
        }
        
      }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
})

//API for HR login
app.post("/login-hr",async(req,res)=>{
  const{mobileNo}=req.body 
  const errors = validationResult(req);
        console.log(req.body)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
      const record = await Hr.findOne({ mobileNo: mobileNo });
      
      console.log(record);
    if(record){
      res.status(200).json({ record,message: 'Please Login' });
    }else{
      res.status(400).json({error:"HR not Found, Please register"})
    }

}catch(err){
  console.error(err);
  res.status(500).json({ message: 'Server Error' });
}
})

//API TO  POST JOBS IN JOB PORTAL

app.post("/post-job",async(req,res)=>{
  const {jobTitle,
  companyName,
  jobType,
  jobCategory,
  jobTags,
  jobExperience,
  jobQualification,
  requiredSkills,
  jobRole,
  jobCity,
  email,
  phone,
  postedOn,
  lastDate,
  requirements,
  responsibilities,
  jobDescription,
  salary,
  applicationUrl}=req.body.values

  console.log(req.body)
  //const newJob=createJob(req.body)
  const newJob=new Jobs({
    jobTitle ,
  companyName,
  jobType,
  jobCategory,
  jobTags,
  jobExperience,
  jobQualification,
  requiredSkills,
  jobRole,
  jobCity,
  email,
  phone,
  postedOn,
  lastDate,
  requirements,
  responsibilities,
  jobDescription,
  salary,
  applicationUrl
  })
  //console.log(newJob)
  try{
    //console.log(newJob)
    if (!jobTitle || !companyName || !jobType || !jobCategory || !jobTags || !jobExperience || !jobQualification || !requiredSkills || !jobRole || !jobCity || !email || !phone || !postedOn || !lastDate || !requirements || !responsibilities || !jobDescription || !salary || !applicationUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  const result=await newJob.save()
  console.log(result)
  res.status(201).json({ message: 'Job Posted successfully' });
  }
  catch(err){
    res.status(500).json({ message: 'Server Error' });
  }
})


app.post("/update-job", async(req,res)=>{
  console.log("req:",req.body)
  try{
    const result=await Jobs.updateOne({_id:req.body.jobId}, {$set:req.body.changedValues}) 
    if(result.modifiedCount===1){
      return res.status(200).json({message:'Job updated successfully'})
    }else{
      return res.status(400).json({error:"Job not updated"})
    }
  } catch(err){
    res.status(500).json({ message: 'Server Error' });
  }
    
})

