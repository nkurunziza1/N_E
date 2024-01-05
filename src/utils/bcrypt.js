import Cryptr from 'cryptr';
import bcrypt from 'bcryptjs';

const { genSaltSync, hashSync, compareSync } = bcrypt;

const cryptr = new Cryptr(process.env.CRYPT_KEY, {
  pbkdf2Iterations: 10000,
  saltLength: 10,
});
class BcryptUtil {
  static hash(string) {
    const pasSalt = genSaltSync(10, 'b');
    const pasHash = hashSync(string, pasSalt);
    return pasHash;
  }

  static compare(value1, value2) {
    const validPass = compareSync(value1, value2);
    return validPass;
  }
}
// module.exports = { BcryptUtil, cryptr };
export {BcryptUtil, cryptr};