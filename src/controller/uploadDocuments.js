const Doc = require("../model/uploadDocuments");
const orderr = require("../model/order");
const axios = require("axios");
const multer = require("multer");
const path = require("path");
const multerS3 = require("multer-s3");

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// configure Cloudinary credentials
cloudinary.config({
  cloud_name: "dbrvq9uxa",
  api_key: "567113285751718",
  api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4",
});

// configure multer to use Cloudinary as storage destination
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Images", // optional folder name in your Cloudinary account
    allowed_formats: ["jpg", "jpeg", "png", "PNG", "pdf"], // optional array of allowed image formats
  },
});

// create multer instance with storage configuration
const upload = multer({ storage: storage });

// Handle POST request to upload image
// exports.createuploadDocuments = async (req, res) => {
//   try {
//     upload.single("image")(req, res, async (err) => {
//       if (err) {
//         console.log(err);
//         return res.status(400).json({ msg: err.message });
//       }

//       const fileUrl = req.file.path;

//       const {
//         bulk_doc_id,
//         missing_documents,
//         overridden_documents,
//         file_name,
//         document_type,
//       } = req.body;

//       // console.log(req.params.id);
//       // console.log(req.file.path);
//       const order_id = req.params.id;
//       // const file = await axios.get(req.file.path);

//       const newBeneficiary = new Doc({
//         bulk_doc_id,
//         missing_documents: [
//           {
//             file_name: fileUrl || file_name || file,
//             document_type,
//           },
//         ],
//         uploaded_documents: [
//           {
//             // fileUrl,
//             document_type,
//           },
//         ],
//         overridden_documents: [
//           {
//             // fileUrl,
//             document_type,
//           },
//         ],
//       });

//       console.log(newBeneficiary);
//       const bene = await newBeneficiary.save();

//       const user = await orderr.findOneAndUpdate(order_id,{ missing_documents: fileUrl}, {
//         new: true,
//         runValidators: true,
//       });
//       if (!user) {
//         return res.status(404).send("User not found");
//       }
//       // res.send(user);
//       await user.save();
//       const clientId = "TEST370281a1d99b47aa3a41930df0182073";
//       const clientSecret = "TEST95fd8451c7e275d78ddb4c769b20c92bdd1f3448";

//       const headers = {
//         "x-api-version": "2023-03-01",
//         "Content-Type": "application/pdf",
//         "X-Client-ID": clientId,
//         "X-Client-Secret": clientSecret,
//       };

//       //console.log(headers);
//       const response = await axios.post(
//         `https://sandbox.cashfree.com/pg/lrs/orders/${order_id}/documents/upload`,
//         { file },
//         {
//           headers: headers,
//         }
//       );

//       console.log(response);
//       const createdBeneficiary = response.data;
//       console.log(createdBeneficiary);

//       res.status(201).send({user:user,bene:bene});
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ msg: error.message, name: error.name });
//   }
// };


exports.createuploadDocuments = async (req, res) => {
  try {
    upload.array("image", 5)(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ msg: err.message });
      }

      const fileUrls = req.files.map((file) => file.path);

      const {
        bulk_doc_id,
        missing_documents,
        overridden_documents,
        file_name,
        document_type,
      } = req.body;

      const order_id = req.params.id;

      const newBeneficiary = new Doc({
        bulk_doc_id,
        missing_documents: fileUrls.map((fileUrl) => ({
          file_name: fileUrl || file_name || file,
          document_type,
        })),
        uploaded_documents: fileUrls.map((fileUrl) => ({
          document_type,
        })),
        overridden_documents: fileUrls.map((fileUrl) => ({
          document_type,
        })),
      });

      console.log(newBeneficiary);
      const bene = await newBeneficiary.save();

      const user = await orderr.findOneAndUpdate(
        order_id,
        { missing_documents: fileUrls },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!user) {
        return res.status(404).send("User not found");
      }
      await user.save();

      const clientId = "TEST370281a1d99b47aa3a41930df0182073";
      const clientSecret = "TEST95fd8451c7e275d78ddb4c769b20c92bdd1f3448";

      const headers = {
        "x-api-version": "2023-03-01",
        "Content-Type": "application/pdf",
        "X-Client-ID": clientId,
        "X-Client-Secret": clientSecret,
      };

      const responsePromises = fileUrls.map((fileUrl) =>
        axios.post(
          `https://sandbox.cashfree.com/pg/lrs/orders/${order_id}/documents/upload`,
          { file: fileUrl },
          {
            headers: headers,
          }
        )
      );

      const responseArray = await Promise.all(responsePromises);
      const createdBeneficiaries = responseArray.map((response) => response.data);

      console.log(createdBeneficiaries);

      res.status(201).send({ user: user, bene: bene });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};


exports.getAllDoc = async (req, res) => {
  try {
    const currencies = await Doc.find();
    res.status(200).json({ msg:currencies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.getDocById = async (req, res) => {
  try {
    const currency = await Doc.findById(req.params.id);
    if (!currency) {
      return res.status(404).json({ message: 'doc not found.' });
    }
    res.status(200).json({ msg:currency });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
