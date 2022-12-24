import connectDB from "../../lib/connectDB";
import Users from "../../lib/userSchema";

export default async (req, res) => {
 
    const { profileId, infoUserUpdate } = req.body;

    await connectDB();

    try {
        await Users.findOneAndUpdate({ profileId: profileId },  infoUserUpdate);
        res.status(200).json(infoUserUpdate);
    } catch (error) {
        res.status(400).json({ error });
        console.error(error);
    }

};