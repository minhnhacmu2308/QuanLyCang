const uploadImg = async (req,res) => {
    try {
      const fileData = req.file;
      console.log("fileData",fileData)
    } catch (err) {
      console.log(err);
      return false;
    }
    return res.status(200).json("ok");
};
module.exports = uploadImg;