"use client"; // บอกว่าไฟล์นี้รันบนฝั่ง Client ของ Next.js

import { isServer, QueryClient } from "@tanstack/react-query";

// ฟังก์ชันสำหรับสร้าง QueryClient ตัวใหม่ พร้อมตั้งค่าพื้นฐาน
const makQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // ตั้งเวลาที่ query จะถือว่ายังใหม่อยู่ (ไม่โหลดซ้ำ) = 1 นาที
        staleTime: 1000 * 60,
      },
    },
  });
};

// ตัวแปรสำหรับเก็บ QueryClient ฝั่งเบราว์เซอร์ (ใช้ร่วมกันทั้งแอป)
let browserQueryClient: QueryClient | undefined = undefined;

// ฟังก์ชันที่ใช้เรียก QueryClient ให้เหมาะกับฝั่งที่รัน (Client/Server)
export function getQueryClient() {
  if (isServer) {
    // ถ้ารันฝั่งเซิร์ฟเวอร์ → สร้างใหม่ทุกครั้ง
    // เพื่อป้องกัน cache ข้ามผู้ใช้ (request isolation)
    return makQueryClient();
  }

  // ถ้ารันบนเบราว์เซอร์
  if (!browserQueryClient) {
    // ถ้ายังไม่มี → สร้างใหม่ครั้งเดียว แล้วใช้ซ้ำ
    browserQueryClient = makQueryClient();
  }

  // คืน QueryClient ตัวที่เก็บไว้
  return browserQueryClient;
}
