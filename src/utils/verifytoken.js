import Jwt from "jsonwebtoken";

const verfyToken = (token, env) => {
    const payload = Jwt.verify(token, env, (error, decodedToken) => {
        if (error) {
          return false;
        } else {
          return decodedToken;
        }
      });

      return payload;

}

export default verfyToken
