import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
    {
        tipoServico:{
           type: String,
           default: "Nao definido",
        },
        valorServico: {
            type: String,
            default: "Nao definido",
        },
        fraseTituloServico: {
            type: String,
            default: "Nao definido",
        },
        informacao1: {
            type: String,
            default: "Nao definido",
        },
        informacao2: {
            type: String,
            default: "Nao definido",
        },
        informacao3: {
            type: String,
            default: "Nao definido",
        },
        informacao4: {
            type: String,
            default: "Nao definido",
        },
        informacao5: {
            type: String,
            default: "Nao definido",
        },
    },
    { timestamps: true }
);

let Services =  mongoose.models.services || mongoose.model("services", serviceSchema);

export default Services;