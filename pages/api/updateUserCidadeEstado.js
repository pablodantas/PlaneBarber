import connectDB from "../../lib/connectDB";
import Users from "../../lib/userSchema";

export default async (req, res) => {
 
    const { profileId, cidade, estado } = req.body;

    await connectDB();

    try {
        await Users.findOneAndUpdate({ profileId: profileId }, { cidade: cidade });
        res.status(200).json({cidade: cidade});
        await Users.findOneAndUpdate({ profileId: profileId }, { estado: estado });
        res.status(200).json({estado: estado});
    } catch (error) {
        res.status(400).json({ error });
        console.error(error);
    }

};