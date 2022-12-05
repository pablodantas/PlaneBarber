import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
    {
        profileId: {
            type: String,
            default: "Nao definido",
        },
        servicePlan: {
            type: String,
            default: "Nao definido",
        },
        formaPagamento: {
            type: String,
            default: "Nao definido",
        },
    },
    { timestamps: true }
);

let Service = mongoose.models.service || mongoose.model("service", serviceSchema);

export default Service;