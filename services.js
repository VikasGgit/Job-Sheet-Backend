import express from 'express';
import multer from 'multer';
import cloudinary from './cloudinary.js';
import Jobsheet from './modals.js';

const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage });


const uploadFileToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) {
          return reject(error); 
        }
        console.log({result});
        resolve(result.secure_url); 
      }
    );
    stream.end(fileBuffer); 
  });
};

//New JOB SHeet
router.post('/create', upload.single('file'), async (req, res) => {
  try {
    let fileUrl = '';

    
    if (req.file) {
      fileUrl = await uploadFileToCloudinary(req.file.buffer);
    }

   
    const newJobsheet = new Jobsheet({
      clientName: req.body.clientName,
      contactNumber: req.body.contactNumber,
      receivedDate: req.body.receivedDate,
      inventory: req.body.inventory,
      inventoryAttachments: fileUrl, // File URL is set here
      reportedIssue: req.body.reportedIssue,
      clientNotes: req.body.clientNotes,
      technician: req.body.technician,
      deadline: req.body.deadline,
      estimatedAmount: req.body.estimatedAmount,
      status: req.body.status,
    });

    
    const savedJobsheet = await newJobsheet.save();
    return res.status(201).json(savedJobsheet); // Send success response
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Send error response
  }
});



// Finding single Jobsheet by id
router.get('/:id', async (req, res) => {
  try {
    const jobsheet = await Jobsheet.findById(req.params.id);
    if (!jobsheet) {
      return res.status(404).json({ message: 'Jobsheet not found' });
    }
    res.status(200).json(jobsheet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

 // All job Sheets
router.get('/', async (req, res) => {
  try{
    const jobsheet = await Jobsheet.find();
    return res.status(200).json(jobsheet);
  }
  catch (error) { return res.status(500).json({ message: error.message }); }
});

// Updating Jobsheet
router.put('/:id', upload.single('file'), async (req, res) => {
  
  try {
    let fileUrl = '';

    if (req.file) {
      fileUrl = await uploadFileToCloudinary(req.file.buffer);
    }


    const updatedJobsheet = await Jobsheet.findByIdAndUpdate(
      req.params.id,
      {
      clientName: req.body.clientName,
      contactNumber: req.body.contactNumber,
      receivedDate: req.body.receivedDate,
      inventory: req.body.inventory,
      inventoryAttachments: fileUrl || req.body.inventoryAttachments, 
      reportedIssue: req.body.reportedIssue,
      clientNotes: req.body.clientNotes,
      technician: req.body.technician,
      deadline: req.body.deadline,
      estimatedAmount: req.body.estimatedAmount,
      add_note: req.body.add_note || "",
      status: req.body.status,
      },
      { new: true }
    );

    if (!updatedJobsheet) {
      return res.status(404).json({ message: 'Jobsheet not found' });
    }
    res.status(200).json(updatedJobsheet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Deleting the Jobsheet
router.delete('/:id', async (req, res) => {
  try {
    const deletedJobsheet = await Jobsheet.findByIdAndDelete(req.params.id);
    if (!deletedJobsheet) {
      return res.status(404).json({ message: 'Jobsheet not found' });
    }
    res.status(200).json({ message: 'Jobsheet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;