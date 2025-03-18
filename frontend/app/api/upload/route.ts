import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(process.cwd(), "public/uploads", file.name);

        await writeFile(filePath, buffer);

        return NextResponse.json({ filePath: `/uploads/${file.name}` });
    } catch (error) {
        console.error("Error saving file:", error);
        return NextResponse.json({ error: "File upload failed" }, { status: 500 });
    }
}
