import { auth } from "@/auth";
import { supabase } from "@/supabase";
import { NextResponse } from "next/server";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import crypto from "crypto";
import { start } from "repl";

export const config = { api: { bodyParser: false } };

// Define schema validation for incoming request data
const schema = Joi.object({
  photo: Joi.any().allow(null),
  p_full_name: Joi.string().min(3).max(255).required(),
  p_email: Joi.string().email().required(),
  p_phone_number: Joi.number().integer().required(),
  p_address: Joi.string().min(5).required(),
  ktp: Joi.any().required(),
  kk: Joi.any().required(),
  npwp: Joi.any().required(),
  p_company_type: Joi.string().required(),
  p_company_name: Joi.string().min(3).max(255).required(),
  p_company_address: Joi.string().min(5).required(),
  p_company_kbli: Joi.string().required(),
  p_company_phone_number: Joi.number().integer().required(),
  p_company_fax_number: Joi.number().integer().allow(null),
  p_company_authorized_capital: Joi.number().integer().required(),
  p_company_paid_up_capital: Joi.number().integer().required(),
  p_company_executives: Joi.string().min(5).required(),
  p_note: Joi.string().allow(null),
  p_package_id: Joi.string().required(),
});

const encryptionKey: Buffer = Buffer.from(process.env.KEY_SECRET!, "utf-8");

export const POST = auth(async function POST(req) {
  if (req.auth) {
    const roleId = req.auth.user.roleid;
    if (!roleId) {
      return NextResponse.json({ success: false, message: "Role ID not found" }, { status: 400 });
    }

    const formData = await req.formData();
    const body = Object.fromEntries(formData);

    const {
      p_full_name,
      p_email,
      p_phone_number,
      p_address,
      p_company_type,
      p_company_name,
      p_company_address,
      p_company_kbli,
      p_company_phone_number,
      p_company_fax_number,
      p_company_authorized_capital,
      p_company_paid_up_capital,
      p_company_executives,
      p_note,
      p_package_id,
    } = body;

    const photo = formData.get("p_photo") as File;
    const ktp = formData.get("p_ktp") as File;
    const npwp = formData.get("p_npwp") as File;
    const kk = formData.get("p_kk") as File;

    // Validate request body
    const { error: validationError } = schema.validate({
      p_full_name,
      p_email,
      p_phone_number,
      p_address,
      p_company_type,
      p_company_name,
      p_company_address,
      p_company_kbli,
      p_company_phone_number,
      p_company_fax_number,
      p_company_authorized_capital,
      p_company_paid_up_capital,
      p_company_executives,
      p_note,
      p_package_id,
      photo,
      ktp,
      npwp,
      kk,
    });
    if (validationError) {
      return NextResponse.json({ success: false, message: validationError.details[0].message }, { status: 400 });
    }

    let photoFileName;
    let ktpFileName;
    let kkFileName;
    let npwpFileName;

    let startEncrypt;
    let finalEncrypt;

    if (photo && ktp && kk && npwp) {
      try {
        const startTime = new Date();

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

        // const extensionPhoto = path.extname(photo.name);
        // const extensionktp = path.extname(ktp.name);
        // const extensionkk = path.extname(kk.name);
        // const extensionnpwp = path.extname(npwp.name);

        // const uniqueFileNamePhoto = `${uuidv4()} ${extensionPhoto}`;
        // const uniqueFileNameKtp = `${uuidv4()} ${extensionktp}`;
        // const uniqueFileNameKk = `${uuidv4()} ${extensionkk}`;
        // const uniqueFileNameNpwp = `${uuidv4()} ${extensionnpwp}`;

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

        const endTime = new Date();

        startEncrypt = startTime;
        finalEncrypt = endTime;
      } catch (err) {
        console.error("Something Went Wrong", err);
      }
    }

    // Call the insert_applicant function and handle applicant and invoice creation
    const { data: applicantData, error: applicantError } = await supabase.rpc("insert_applicant", {
      p_photo: photoFileName,
      p_full_name,
      p_email,
      p_phone_number,
      p_address,
      p_ktp: ktpFileName,
      p_npwp: npwpFileName,
      p_kk: kkFileName,
      p_company_type,
      p_company_name,
      p_company_address,
      p_company_kbli,
      p_company_phone_number,
      p_company_fax_number,
      p_company_authorized_capital,
      p_company_paid_up_capital,
      p_company_executives,
      p_start_encrypt: startEncrypt!.toISOString(),
      p_final_encrypt: finalEncrypt!.toISOString(),
      p_note,
      p_package_id, // Include the missing p_package_id
    });

    if (applicantError) {
      console.error(applicantError);
      return NextResponse.json({ success: false, message: "Error inserting applicant" }, { status: 500 });
    }

    // Check if we received data
    console.log("Supabase Data Response:", applicantData); // Log data to verify
    console.log("Supabase Error:", applicantError); // Log the error (if any)

    // Return the invoice ID as the response
    return NextResponse.json({ success: true, data: applicantData }, { status: 200 });
  }

  return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
});
