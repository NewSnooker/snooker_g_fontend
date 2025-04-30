import * as z from "zod";

export const signupFormSchema = z
  .object({
    username: z
      .string()
      .max(20, { message: "ชื่อต้องไม่เกิน 20 ตัวอักษร" })
      .min(5, { message: "ชื่อต้องมีอย่างน้อย 5 ตัวอักษร" }),
    email: z
      .string()
      .max(30, { message: "อีเมลต้องไม่เกิน 30 ตัวอักษร" })
      .min(5, { message: "อีเมลต้องมีอย่างน้อย 5 ตัวอักษร" })
      .email({ message: "รูปแบบอีเมลไม่ถูกต้อง" }),
    password: z
      .string()
      .min(8, { message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" })
      .max(20, { message: "รหัสผ่านต้องไม่เกิน 20 ตัวอักษร" })
      .regex(/[a-zA-Z0-9]/, { message: "ต้องมีตัวอักษรและเลขอย่างน้อย 1 ตัว" }),
    confirmPassword: z
      .string()
      .min(8, { message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" })
      .max(20, { message: "รหัสผ่านต้องไม่เกิน 20 ตัวอักษร" })
      .regex(/[a-zA-Z0-9]/, { message: "ต้องมีตัวอักษรและเลขอย่างน้อย 1 ตัว" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านและยืนยันรหัสผ่านต้องตรงกัน",
    path: ["confirmPassword"], // ระบุฟิลด์ที่จะแสดงข้อความผิดพลาด
  });

export const signinFormSchema = z.object({
  email: z.string().max(50, { message: "อีเมลต้องไม่เกิน 50 ตัวอักษร" }).email({
    message: "รูปแบบอีเมลไม่ถูกต้อง",
  }),
  password: z
    .string()
    .min(8, { message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" })
    .max(20, { message: "รหัสผ่านต้องไม่เกิน 20 ตัวอักษร" })
    .regex(/[a-zA-Z0-9]/, { message: "ต้องมีตัวอักษรและเลขอย่างน้อย 1 ตัว" }),
});

export const imageFormSchema = z.object({
  name: z.string(),
  key: z.string(),
  url: z.string(),
});

export const accountFormSchema = z.object({
  username: z
    .string()
    .max(20, { message: "ชื่อต้องไม่เกิน 20 ตัวอักษร" })
    .min(5, { message: "ชื่อต้องมีอย่างน้อย 5 ตัวอักษร" }),
});

export const joinCodeFormSchema = z.object({
  joinCode: z
    .string()
    .length(6, { message: "รหัสห้องต้องมีความยาว 6 ตัวอักษร" }),
});
