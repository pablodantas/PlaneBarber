import connectDB from "../../lib/connectDB";
import Users from "../../lib/userSchema";

export default async (req, res) => {
 
    const { profileId, nome, cpf } = req.body;

    await connectDB();

    try {
        await Users.findOneAndUpdate({ profileId: profileId }, { nome: nome });
        res.status(200).json({nome: nome});
        await Users.findOneAndUpdate({ profileId: profileId },{ cpf: cpf });
        res.status(200).json({cpf: cpf});
    } catch (error) {
        res.status(400).json({ error });
        console.error(error);
    }

};