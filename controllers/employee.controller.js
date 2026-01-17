// import multer from "multer"
import Employee from "../models/employee.model.js"
import User  from "../models/user.model.js"
// import "../middleware/multer.js"
import cloudinary from "../config/cloudinary.js"
import upload from "../middleware/multer.js"
// import Department from "../models/department.model.js"
import bcrypt from "bcrypt"
// import path from "path"


// const storage = multer.diskStorage({  
//     destination: (req, file, cb) => {
//         cb(null, "public/uploads")
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({storage: storage}) 









const addEmployee  = async (req, res ) => {
   try {
     const {
         name,
         email,
         employeeId,
         dob,
         gender,
         maritalStatus,
         designation,
         department,
         salary,
         password,
         role,
     } = req.body

//  // 🔴 image check
//     if (!req.file) {
//       return res.status(400).json({ message: "Image is required" })
//     }

//     // 🔴 Cloudinary upload
//     let imageUrl = "";
//     const result = await cloudinary.uploader.upload(
//       req.file.path,
//       {
//         folder: "employees",
//       }
//     )
//     imageUrl = result.secure_url
//     // 🔴 Save employee
//     const employee = await Employee.create({
//       name,
//       email,
//       employeeId,
//       dob,
//       gender,
//       maritalStatus,
//       designation,
//       department,
//       salary,
//       password,
//       role,
//       image: result.secure_url, // ✅ Cloudinary URL
//     })

//     res.status(201).json(employee)
    
     


      
      
 
//     const user = await User.findOne({email})
//     if(user){
//      return res.status(400).json({success: false, error: "user already registered in employee"})
//     }
 
//     const hashPassword = await bcrypt.hash(password, 10)
 
//     const newUser = new User({
//      name,
//      email,
//      password: hashPassword,
//      role,
//     //  profileImage: req.file ? req.file.filename : ""  
//      profileImage: imageUrl  
//     })
 
//    const savedUser = await newUser.save()
   
//    const newEmployee = new Employee({
//      userId: savedUser._id,
//      employeeId,
//      dob,
//      gender,
//      maritalStatus,
//      designation,
//      department,
//      salary
//    })
 
//    await newEmployee.save()
//    return res.status(200).json({success:true, message: "employee created"})

//    } catch (error) {
//     console.log(error.message)
//     return res.status(500).json({success:false, error: "server error in adding employee"})
//    }
if (!req.file) {
      return res.status(400).json({ message: "Image is required" })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "employees",
    })

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: result.secure_url,
    })

    await Employee.create({
      userId: newUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    })

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Server error" })
  }
}






const getEmployees = async (req, res) => {
     try {
        const employees = await Employee.find().populate('userId', {password: 0}).populate('department')
        return res.status(200).json({success: true, employees})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({successs: false, error: "get employees server error "})
        
    }
}

const getEmployee = async (req, res) => {

    const {id} = req.params;
   try {
    let employee;
        employee = await Employee.findById({_id: id}).populate('userId', {password: 0}).populate('department');
        if(!employee){
           employee = await Employee.findOne({ userId: id })
           .populate('userId', {password: 0})
           .populate('department')
        }
        return res.status(200).json({success: true, employee})
    } catch (error) {
        console.log(error.message)
       
        return res.status(500).json({successs: false, error: "get employees server error "})
        
    }
}

const updateEmployee = async (req, res) => {
     try {
        const {id} = req.params;
        const {
         name,        
         maritalStatus,
         designation,
         department,
         salary,
     } = req.body;

     const employee = await Employee.findById({_id: id})
     if(!employee){
        return res.status(404).json({success:false, error: "employee not found"})
     }

     const user = await User.findById({_id: employee.userId})

     if(!user){
        return res.status(404).json({success:false, error: "user not found"})
     }

     const updateUser = await User.findByIdAndUpdate({_id: employee.userId}, {name})
     const updateEmployee = await Employee.findByIdAndUpdate({_id: id}, {
        maritalStatus,
        designation,
        salary,
        department,
     }) 

     if(!updateUser || !updateEmployee){
        return res.status(404).json({success:false, error: "document not found"})

     }

     return res.status(200).json({success:true, message: "employee Updated"})

    } catch (error) {
       
        return res.status(500).json({successs: false, error: "update employees server error "})
        
    }
}

const fetchEmployeesByDepId = async (req, res)=> {
  const {id} = req.params;
   try {
        const employees = await Employee.find({department: id })
        return res.status(200).json({success: true, employees })
    } catch (error) {
       
        return res.status(500).json({successs: false, error: "get employeesByDepId server error "})
        
    }
}

export {
    addEmployee,
    upload,
    getEmployees,
    getEmployee,
    updateEmployee,
    fetchEmployeesByDepId
}