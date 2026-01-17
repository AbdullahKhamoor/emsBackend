import multer from "multer"

const storage = multer.diskStorage({})

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
})

export default upload
