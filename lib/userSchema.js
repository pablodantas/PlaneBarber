import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        profileId: {
            type: String,
        },
        nome: {
            type: String,
            default: "Nao definido",
        },
        cpf: {
            type: String,
            default: "Nao definido",
        },
        celular: {
            type: String,
            default: "Nao definido",
        },
        cep: {
            type: String,
            default: "Nao definido",
        },
        bairro: {
            type: String,
            default: "Nao definido",
        },
        numero: {
            type: String,
            default: "Nao definido",
        },
        cidade: {
            type: String,
            default: "Nao definido",
        },
        estado: {
            type: String,
            default: "Nao definido",
        },
    },
    { timestamps: true }
);

let Users = mongoose.models.users || mongoose.model("users", userSchema);

export default Users;