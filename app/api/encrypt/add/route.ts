import { auth } from "@/auth";
import { supabase } from "@/supabase";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

const encryptionKey = Buffer.from(process.env.KEY_SECRET!, "utf-8");

function encryptData(data: string): string {
  const iv = Buffer.alloc(16, 0); // IV hardcoded dengan nilai nol untuk konsistensi
  const cipher = crypto.createCipheriv("aes-256-ctr", encryptionKey, iv);
  const encrypted = Buffer.concat([cipher.update(data, "utf-8"), cipher.final()]);
  return encrypted.toString("base64");
}

export const POST = auth(async function POST(req) {
  if (req.auth) {
    const roleId = req.auth.user.roleid;
    if (!roleId) {
      return NextResponse.json({ success: false, message: "Role ID not found" }, { status: 400 });
    }

    const formData = await req.formData();

    // Convert formData to an object for easier handling
    const body = Object.fromEntries(formData.entries());

    console.log("hit body", body);

    const p_full_name = String(body.full_name);
    const p_email = String(body.email);
    const p_phone_number = String(body.phone_number);
    const p_address = String(body.address);
    const p_company_name = String(body.company_name);
    const p_company_address = String(body.company_address);
    const p_kbli = String(body.kbli);
    const p_company_type = String(body.company_type);
    const p_company_phone_number = String(body.company_phone_number);
    const p_company_fax_number = String(body.company_fax_number);
    const p_company_authorized_capital = String(body.company_authorized_capital);
    const p_company_paid_up_capital = String(body.company_paid_up_capital);
    const p_company_executives = String(body.company_executives);

    // Encrypting the necessary fields
    const encryptedFullName = encryptData(p_full_name);
    const encryptedEmail = encryptData(p_email);
    const encryptedPhoneNumber = encryptData(p_phone_number);
    const encryptedAddress = encryptData(p_address);
    const encryptedCompanyType = encryptData(p_company_type);
    const encryptedCompanyName = encryptData(p_company_name);
    const encryptedCompanyAddress = encryptData(p_company_address);
    const encryptedKbli = encryptData(p_kbli);
    const encryptedCompanyPhoneNumber = encryptData(p_company_phone_number);
    const encryptedCompanyFaxNumber = encryptData(p_company_fax_number);
    const encryptedCompanyAuthorizedCapital = encryptData(p_company_authorized_capital);
    const encryptedCompanyPaidUpCapital = encryptData(p_company_paid_up_capital);
    const encryptedCompanyExecutives = encryptData(p_company_executives);

    // File Gambar
    const photo = formData.get("p_photo") as File;
    const ktp = formData.get("p_ktp") as File;
    const npwp = formData.get("p_npwp") as File;
    const kk = formData.get("p_kk") as File;

    let photoFileName;
    let ktpFileName;
    let kkFileName;
    let npwpFileName;

    if (photo && ktp && kk && npwp) {
      try {
        const encryptFile = (fileBuffer: Buffer, encryptionKey: Buffer): Buffer => {
          // Create a new cipher instance for each file
          // encrypt file
          const cipher = crypto.createCipheriv("aes-256-ctr", encryptionKey, Buffer.alloc(16, 0));
          return Buffer.concat([cipher.update(fileBuffer), cipher.final()]);
        };

        const fileBufferPhoto = Buffer.from(await photo.arrayBuffer());
        const fileBufferKtp = Buffer.from(await ktp.arrayBuffer());
        const fileBufferKk = Buffer.from(await kk.arrayBuffer());
        const fileBufferNpwp = Buffer.from(await npwp.arrayBuffer());

        const encryptedPhoto = encryptFile(fileBufferPhoto, encryptionKey);
        const encryptedKtp = encryptFile(fileBufferKtp, encryptionKey);
        const encryptedKk = encryptFile(fileBufferKk, encryptionKey);
        const encryptedNpwp = encryptFile(fileBufferNpwp, encryptionKey);

        const uniqueFileNamePhoto = `${uuidv4()}.enc`;
        const uniqueFileNameKtp = `${uuidv4()}.enc`;
        const uniqueFileNameKk = `${uuidv4()}.enc`;
        const uniqueFileNameNpwp = `${uuidv4()}.enc`;

        photoFileName = uniqueFileNamePhoto;
        ktpFileName = uniqueFileNameKtp;
        kkFileName = uniqueFileNameKk;
        npwpFileName = uniqueFileNameNpwp;

        const files = [
          {
            path: `document/${uniqueFileNamePhoto}`,
            file: encryptedPhoto,
          },
          {
            path: `document/${uniqueFileNameKtp}`,
            file: encryptedKtp,
          },
          {
            path: `document/${uniqueFileNameKk}`,
            file: encryptedKk,
          },
          {
            path: `document/${uniqueFileNameNpwp}`,
            file: encryptedNpwp,
          },
        ];

        const uploadPromise = files.map(({ path, file }) => {
          supabase.storage.from("folder").upload(path, file, {
            cacheControl: "0",
            upsert: false,
          });
        });

        // const uploadResult = await Promise.all(uploadPromise);

        // uploadResult.forEach(({ data, error }: any, index) => {
        //   if (error) {
        //     console.error(`Error on Upload ${files[index].path}`, error.message);
        //   } else {
        //     console.log(`Success on Upload ${files[index].path}`);
        //   }
        // });
      } catch (err) {
        console.error("Something Went Wrong", err);
      }
    }

    const { data, error } = await supabase.rpc("insert_encrypt", {
      p_address: encryptedAddress,
      p_company_address: encryptedCompanyAddress,
      p_company_authorized_capital: encryptedCompanyAuthorizedCapital,
      p_company_executives: encryptedCompanyExecutives,
      p_company_fax_number: encryptedCompanyFaxNumber,
      p_company_kbli: encryptedKbli,
      p_company_name: encryptedCompanyName,
      p_company_paid_up_capital: encryptedCompanyPaidUpCapital,
      p_company_phone_number: encryptedCompanyPhoneNumber,
      p_company_type: encryptedCompanyType,
      p_email: encryptedEmail,
      p_full_name: encryptedFullName,
      p_kk: kkFileName,
      p_ktp: ktpFileName,
      p_npwp: npwpFileName,
      p_phone_number: encryptedPhoneNumber,
      p_photo: photoFileName,
    });

    if (error) {
      console.error("Error calling insert_encrypt:", error);
      return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
    return NextResponse.json({ success: true, data }, { status: 200 });
  }
  return NextResponse.json({ success: false, message: "No Authorized" }, { status: 401 });
});
