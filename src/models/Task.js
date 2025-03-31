import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  points: {
    type: Number,
    required: true,
    default: 0,
    get: v => parseFloat(v.toFixed(2)), // Round to 2 decimal places
    set: v => parseFloat(v)  // Ensure input is a float
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.model('Task', taskSchema);

export default Task; 