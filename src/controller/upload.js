import pdfDetails from "../models/Upload.js";
export  const uploadPdf = async (req, res) => {
  const { title } = req.body;
  const fileName = req.file.filename

  try {
    const data = await pdfDetails.create({
      title,
      pdf: fileName
    });
    res.status(200).send(data);
  } catch (error) {
  }
};

export const getPdf = async(req, res) => {
    try{
       const data = await pdfDetails.find()
       res.send(data)

    }catch(error){
       throw error
    }
}

