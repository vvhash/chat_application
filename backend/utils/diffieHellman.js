import { DiffieHellman } from 'diffie-hellman';
import { Buffer } from 'buffer';

export const generateKeys = () => {
  const dh = new DiffieHellman(2048);
  const publicKey = dh.generateKeys('hex');
  const privateKey = dh.getPrivateKey('hex');
  return { publicKey, privateKey };
};

export const computeSecret = (privateKey, receivedPublicKey) => {
  const dh = new DiffieHellman(2048);
  dh.setPrivateKey(Buffer.from(privateKey, 'hex'));
  return dh.computeSecret(Buffer.from(receivedPublicKey, 'hex')).toString('hex');
};
