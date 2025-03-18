# Frontend for Main Project

This is a **Next.js** frontend project that allows users to upload files. The project is built using **App Router** and styled with **Tailwind CSS**.

## 🚀 Features
- 📂 File upload functionality
- 🎨 Beautiful UI with Tailwind CSS
- 🔄 Loading indicator during file upload
- ✅ Success & error messages
- 📁 Stores uploaded files in `public/uploads/`

## 📦 Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/mainproject-frontend.git
   cd mainproject-frontend/frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The app should now be running at `http://localhost:3000`.

## 🎨 Tailwind CSS Setup

If Tailwind isn't already set up, follow these steps:

1. Install Tailwind CSS:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. Configure `tailwind.config.ts`:
   ```ts
   /** @type {import('tailwindcss').Config} */
   const config = {
     content: ["./app/**/*.{js,ts,jsx,tsx}"],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   export default config;
   ```

3. Add Tailwind to your `globals.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

## 🛠 File Upload API Route
The upload functionality is handled in the API route:

- **Location:** `app/api/upload/route.ts`
- **Stores files in:** `public/uploads/`

```ts
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
```

## 📄 Project Structure
```
frontend/
├── app/
│   ├── api/upload/route.ts  # API route for file upload
│   ├── components/
│   │   ├── FileUpload.tsx   # File upload UI component
│   ├── page.tsx             # Main page
│   ├── globals.css          # Global styles
├── public/uploads/          # Uploaded files (make sure this folder exists!)
├── tailwind.config.ts       # Tailwind CSS config
├── tsconfig.json            # TypeScript config
├── package.json             # Dependencies
└── README.md                # Project documentation
```

## 🛠 Useful Commands
- **Start Dev Server:** `npm run dev`
- **Build for Production:** `npm run build`
- **Lint Code:** `npm run lint`

## 🤝 Contributing
1. Fork the repo
2. Create a new branch: `git checkout -b feature-branch`
3. Make changes and commit: `git commit -m 'Add new feature'`
4. Push the branch: `git push origin feature-branch`
5. Open a pull request

## 📜 License
This project is licensed under the **MIT License**.

---

🌟 **If you find this project helpful, give it a star!** ⭐

