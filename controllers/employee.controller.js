import multer from "multer"
import Employee from "../models/employee.model.js"
import User  from "../models/user.model.js"
import "../middleware/multer.js"
import cloudinary from "../config/cloudinary.js"
// import Department from "../models/department.model.js"
import bcrypt from "bcrypt"
import path from "path"


// const storage = multer.diskStorage({  
//     destination: (req, file, cb) => {
//         cb(null, "public/uploads")
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({storage: storage}) 


const storage = multer.diskStorage({})

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
})


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

      if (!req.file) {
        return res.status(400).json({ message: "Image required" })
      }

      const result = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "employees", // Cloudinary folder
        }
      )

      const employee = await Employee.create({
        name,
        email,
        position,
        image: result.secure_url,
      })

      res.status(201).json(employee)
 
    const user = await User.findOne({email})
    if(user){
     return res.status(400).json({success: false, error: "user already registered in employee"})
    }
 
    const hashPassword = await bcrypt.hash(password, 10)
 
    const newUser = new User({
     name,
     email,
     password: hashPassword,
     role,
    //  profileImage: req.file ? req.file.filename : ""  
     profileImage: result.secure_url  
    })
 
   const savedUser = await newUser.save()
   
   const newEmployee = new Employee({
     userId: savedUser._id,
     employeeId,
     dob,
     gender,
     maritalStatus,
     designation,
     department,
     salary
   })
 
   await newEmployee.save()
   return res.status(200).json({success:true, message: "employee created"})

   } catch (error) {
    console.log(error.message)
    return res.status(500).json({success:false, error: "server error in adding employee"})
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