import { NextResponse } from "next/server";
import crypto from "crypto";

// Pake key yang sama dengan KEY_SECRET dari .env
const encryptionKey = Buffer.from("bXwAG1seFzkFnxr87W6hpshtSXe6TskD", "utf-8");

const encryptText = (plainText: string, key: Buffer): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
  return `${encrypted.toString("hex")}:${iv.toString("hex")}`;
};

const decryptText = (cipherText: string, key: Buffer): string => {
  try {
    const [encryptedHex, ivHex] = cipherText.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const encryptedText = Buffer.from(encryptedHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    return decrypted.toString("utf-8");
  } catch (err) {
    console.error("Decrypt error =>", err);
    return "[FAILED]";
  }
};

export async function GET() {
  const original = "Cinderella Cantik";
  const encrypted = encryptText(original, encryptionKey);
  const decrypted = decryptText(encrypted, encryptionKey);

  return NextResponse.json({
    original,
    encrypted,
    decrypted,
    success: decrypted === original,
  });
}
