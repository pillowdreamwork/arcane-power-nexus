import CryptoJS from 'crypto-js';

const SECRET_KEY = 'sacred-fortress-key'; // In production, use a secure key management system

export function encryptRitualData(data: any): string {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  return ciphertext;
}

export function decryptRitualData(ciphertext: string): any {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
}
