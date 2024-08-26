'use client'
/* eslint-disable react/no-unescaped-entities */
// components/Formulaire.tsx
import { useState, useRef, useEffect } from "react";
import { FileUpload } from "./ui/file-upload";

const Formulaire: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFile(file);
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setVideoPreview(previewURL);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.src = previewURL;
          videoRef.current.play();
        }
      }, 0);
    } else {
      setVideoPreview(null);
    }
  };

  useEffect(() => {
    if (videoRef.current && videoPreview) {
      videoRef.current.play();
    }
  }, [videoPreview]);

  return (
    <div className="flex flex-col lg:flex-row justify-center bg-gray-50 min-h-screen p-4">
      <div className="order-2 lg:order-1 bg-white shadow-md rounded-lg p-8 w-full h-full lg:w-3/4 lg:ml-8 mt-8 lg:mt-0 max-w-3xl">
        <h1 className="text-2xl font-semibold mb-6">Formulaire d'enregistrement de nouveaux clients</h1>
        <form className="h-full lg:max-h-[80vh] lg:overflow-y-auto overflow-hidden">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
              URL <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="url"
              type="url"
              name="url"
              placeholder="Enter the URL of your social networks"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Describe yourself in a few words <span className="text-red-500">*</span>
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              placeholder="Tell us a little about yourself"
            />
          </div>

          {/* Upload video */}
          <div className="mb-4">
            <label className="block mb-2 text-xl font-semibold">Upload a Welcome Video</label>
            <div
              className="relative flex items-center justify-center w-full h-48 p-10 border-2 border-dashed rounded-lg cursor-pointer bg-gradient-to-r from-pink-200 via-white to-cyan-200 animate-gradient-x"
            >
              <input
                name="file"
                type="file"
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
                onChange={onFileChange}
              />
              {!file && (
                <div className="text-center">
                  <svg
                    className="w-8 h-8 mx-auto mb-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16V8m0 0l-4 4m4-4l4 4m2 8h6a2 2 0 002-2v-6a2 2 0 00-2-2h-1m-10 0H5a2 2 0 00-2 2v6a2 2 0 002 2h6z"
                    ></path>
                  </svg>
                  <p className="text-gray-600">Click Here / Drop File Here</p>
                </div>
              )}
              {file && <p className="text-gray-600">{file.name}</p>}
            </div>
          </div>

          {/* Render the video preview below the file upload for small screens */}
          {videoPreview && (
            <div className="block lg:hidden mb-4">
              <label className="block mb-2">Video Preview</label>
              <video
                ref={videoRef}
                className="w-full border rounded-xl"
                controls
                autoPlay
                loop
              >
                <source src={videoPreview} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          {/* Add more fields here if needed */}
          <FileUpload />
        </form>
      </div>

      <div className="order-1 lg:order-2 w-full lg:w-1/4 lg:ml-8 lg:mt-0">
        <div className="bg-white shadow-md rounded-lg p-8 w-full">
          <h2 className="text-xl font-semibold mb-6">Formulaire d'enregistrement de nouveaux clients</h2>
          <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full">
            Utiliser le modèle
          </button>
          <div className="mt-6">
            <p className="text-sm text-gray-500">Catégories</p>
            <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full mt-2">Formulaires d'enregistrement client</span>
          </div>
        </div>

        {/* Render the video preview below "Utiliser le modèle" button for larger screens */}
        {videoPreview && (
          <div className="hidden lg:block mt-8">
            <label className="block mb-2">Video Preview</label>
            <video
              ref={videoRef}
              className="w-full border rounded-xl"
              controls
              autoPlay
              loop
            >
              <source src={videoPreview} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Formulaire;
