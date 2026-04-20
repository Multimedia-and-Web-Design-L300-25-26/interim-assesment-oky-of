import mongoose from "mongoose"

const cryptoSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: [true, "Crypto name is required"],
        trim: true,
        minlength: [2, "Crypto name must be at least 2 characters"],
        maxlength: [50, "Crypto name must be at most 50 characters"]
    },
    symbol: {
        type: String,
        required: [true, "Crypto symbol is required"],
        trim: true,
        uppercase: true,
        minlength: [2, "Crypto symbol must be at least 2 characters"],
        maxlength: [10, "Crypto symbol must be at most 10 characters"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"]
    },
    image: {
        type: String,
        required: [true, "Image URL is required"],
        trim: true,
        match: [/^https?:\/\/\S+$/i, "Image must be a valid URL"]
    },
    change24h: {
        type: Number,
        required: [true, "24h change is required"],
        min: [-100, "24h change cannot be less than -100"]
    }
},
{
    strict: "throw",
    timestamps: true
}
)

export default mongoose.model("Crypto", cryptoSchema)
