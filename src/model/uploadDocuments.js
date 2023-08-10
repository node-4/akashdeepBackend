const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const uploaddocumentsSchema = mongoose.Schema({
    
        bulk_doc_id :{
            type:String
        },
        order_id:{
            type:String
        },
        uploaded_documents: [
            {
                file_name :{
                    type:String
                },
                document_type:{
                    type:String
                }
            }
        ],
      
 })

module.exports = mongoose.model("uploaddocument", uploaddocumentsSchema);
