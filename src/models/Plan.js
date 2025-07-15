import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
      },
      image: {
        type: String,
      },
      des: {
        type: String,
      },
      location:{
        type:String,
      },
      date: {
        type: Date,
      },
      totalAmount:{
        type:Number
      },
      requiredAmount:{
        type:Number,
      },
      totalMembers:{
        type:Number,
      },
      requiredMembers:{
        type:Number
      }
})

const Plan = mongoose.models.Plan || mongoose.model("Plan", planSchema);
export default Plan;
