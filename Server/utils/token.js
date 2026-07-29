import jwt from "jsonwebtoken";

const genToken = async (userid) => {
    try {
        const token = await jwt.sign({userid},process.env.SECRET,{expiresIn:'14d'});
        return token;
    } catch (error) {
        console.log(error);
        
    }
}
export default genToken;