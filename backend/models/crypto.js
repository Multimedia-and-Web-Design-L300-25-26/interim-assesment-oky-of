import mongoose from "mongoose"

const cryptoSchema = new mongoose.Schema(
{
    name: String,
    symbol: String,
    price: Number,
    image: String,
    change24h: Number
},
{ timestamps: true }
)

export default mongoose.model("Crypto", cryptoSchema)