import FileUpload from "../../components/FileUpload";


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Upload your .osm File</h1>
      <FileUpload />
    </main>
  );
}