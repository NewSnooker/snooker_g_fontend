"use client";
import Link from "next/link";
import React from "react";
import { ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CanvasBlurSpotsLarge from "@/components/CanvasBlurSpotsLarge";
import Lottie from "lottie-react";
import NotFoundAnimation from "../public/404_not_found.json";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="container max-w-3xl mx-auto min-h-[80vh] flex flex-col justify-center items-center py-12">
      <CanvasBlurSpotsLarge />
      <Card className="w-full text-center shadow-none border-none">
        <CardHeader>
          <CardTitle className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            ไม่พบหน้าที่ค้นหา
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground hidden md:block">
            ข้อมูลที่คุณต้องการไม่สามารถแสดงได้ในขณะนี้
            <br />
            อาจเป็นเพราะคุณพิมพ์ที่อยู่ผิด หน้านี้ถูกลบออกไปแล้ว
            หรือคุณไม่มีสิทธิ์เข้าถึงหน้านี้
            <br />
            กรุณาตรวจสอบอีกครั้ง หรือกลับไปยังหน้าแรก
          </p>
          <div className=" flex items-center justify-center">
            <Lottie
              animationData={NotFoundAnimation}
              className="w-96 px-10 sm:p-0"
            />
          </div>

          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              ย้อนกลับ
            </Button>

            <Button asChild className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                กลับหน้าหลัก
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
