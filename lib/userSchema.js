import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        profileId: {
            type: String,
        },
        wallet: {
            type: String,
            default: "Nao definido",
        },
        network: {
            type: String,
            default: "Nao definido",
        },
    },
    { timestamps: true }
);

let Users = mongoose.models.users || mongoose.model("users", userSchema);

export default Users;