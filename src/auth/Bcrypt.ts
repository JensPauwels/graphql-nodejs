import bcrypt from 'bcrypt';

class Bcrypt {
  // hash hashes the given plaintext with 15 salt rounds.
  hash = (plaintext: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(plaintext, 15, (err, hash) => {
        if (err) {
          reject(err);
        }

        resolve(hash);
      });
    });
  }; 

  // compare compares the given plain text with the given hash.
  isValid = (plaintext: string, hash: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plaintext, hash, (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    })
  };
}

export default new Bcrypt();
