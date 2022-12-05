import connectDB from "../../lib/connectDB";
import Users from "../../lib/userSchema";

export default async (req, res) => {
 
    const { profileId, bairro, numero, } = req.body;

    await connectDB();

    try {
        await Users.findOneAndUpdate({ profileId: profileId }, { bairro: bairro });
        res.status(200).json({ bairro: bairro});
        await Users.findOneAndUpdate({ profileId: profileId }, { numero: numero });
        res.status(200).json({numero: numero});
    } catch (error) {
        res.status(400).json({ error });
        console.error(error);
    }

};