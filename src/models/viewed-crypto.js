import mongoose from "mongoose";

const viewedCryptoSchema = mongoose.Schema({
    cryto_code: {
      type: String,
      require: true
    },
    cryto_id: {
      type: String,
      require: true
    },
    viewed: {
      type: Number,
      require: true
    },
    meta_data: Object,
    created_at: Date,
    updated_at: Date
})

const ViewedCrypto = mongoose.models.ViewedCrypto || mongoose.model('viewed-cryptos',viewedCryptoSchema)
export default  ViewedCrypto