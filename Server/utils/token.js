import jwt from "jsonwebtoken";

const genToken = async (req,res) => {
    try {
        const token = await jwt.sign({userid},process.env.SECRET,{expireIn:'14d'});
        return token;
    } catch (error) {
        console.log(error);
        
    }
}
export default genToken;