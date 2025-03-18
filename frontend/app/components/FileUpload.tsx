"use client";

import { useState } from "react";
import { Upload, Loader } from "lucide-react"; // Icons for better UI

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setMessage(`✅ File uploaded: ${data.filePath}`);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("❌ Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-96 mx-auto text-center">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Upload a File</h2>
      
      <label className="cursor-pointer bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center">
        <Upload className="h-8 w-8 text-gray-500 mb-2" />
        <span className="text-gray-600">Click to select a file</span>
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>

      {file && <p className="mt-2 text-gray-600">{file.name}</p>}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`mt-4 px-5 py-2 text-white rounded-lg transition ${
          uploading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {uploading ? <Loader className="animate-spin h-5 w-5" /> : "Upload"}
      </button>

      {message && <p className="mt-3 text-sm font-medium text-green-600">{message}</p>}
    </div>
  );
}
