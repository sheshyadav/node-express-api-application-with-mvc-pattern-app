import jwt from "jsonwebtoken";
const jwtSecret = 'ASHGDAI#ADASDPOLKMM{{>{ASD&^@&SAHAFG*&^!#(YD&^@*@&DV%@#$(@@&@VD(*^#&*^VXFCSDADDAD';

export function generateToken(user){
  try {
    const payload = {id:user.id, name:user.name, email:user.email};
    return jwt.sign(payload, jwtSecret, { algorithm: 'HS512', expiresIn: "5m" });
  } catch (error) {
    throw new Error(error);
  }
}

export default jwtSecret;


