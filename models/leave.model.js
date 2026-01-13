import mongoose, {Schema} from "mongoose";

const leaveSchema = new Schema({
 employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    leaveType: {
        type: String,
        enum: ["Sick Leave", "Casual Leave", "Annual Leave"],
        required: true,
    },
    startDate:{
        type: String,
        required: true
    },
    endDate:{
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },

}, {timestamps: true})


 const Leave = mongoose.model("Leave", leaveSchema)
 export default Leave