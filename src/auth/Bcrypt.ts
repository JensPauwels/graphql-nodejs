import bcrypt from 'bcrypt';

class Bcrypt {
	// Hash hashes the given plaintext with 15 salt rounds.
	hash = async (plaintext: string): Promise<string> => new Promise((resolve, reject) => {
		bcrypt.hash(plaintext, 15, (err, hash) => {
			if (err) {
				reject(err);
			}

			resolve(hash);
		});
	});

	// Compare compares the given plain text with the given hash.
	isValid = async (plaintext: string, hash: string): Promise<boolean> => new Promise((resolve, reject) => {
		bcrypt.compare(plaintext, hash, (err, result) => {
			if (err) {
				reject(err);
			}

			resolve(result);
		});
	});
}

export default new Bcrypt();
