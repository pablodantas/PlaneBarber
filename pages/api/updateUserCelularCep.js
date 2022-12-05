import connectDB from "../../lib/connectDB";
import Users from "../../lib/userSchema";

export default async (req, res) => {
 
    const { profileId, celular, cep } = req.body;

    await connectDB();

    try {
        await Users.findOneAndUpdate({ profileId: profileId }, { celular: celular });
        res.status(200).json({celular: celular});
        await Users.findOneAndUpdate({ profileId: profileId }, { cep: cep });
        res.status(200).json({cep: cep});
    } catch (error) {
        res.status(400).json({ error });
        console.error(error);
    }

};