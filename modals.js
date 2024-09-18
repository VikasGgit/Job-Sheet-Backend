import mongoose from "mongoose";

const jobsheetSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  receivedDate: {
    type: Date,
    required: true
  },
  inventory: {
    type: String,
    required: true
  },
  inventoryAttachments: {
   type: String,
  },
  reportedIssue: {
    type: String,
    required: true
  },
  clientNotes: {
    type: String
  },
  technician: {
    type: String
  },
  deadline: {
    type: Date,
    required: true
  },
  estimatedAmount: {
    type: Number,
  },
  add_note:{
    type: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Pending'
  }
});

const Jobsheet = mongoose.model('Jobsheet', jobsheetSchema);

export default Jobsheet;
