'use client'
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";
import { FileUpload } from "./ui/file-upload";
import { BackgroundGradient } from "./ui/background-gradient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Schéma de validation Zod
const formulaireSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  url: z.string().url({ message: "Invalid URL format" }),
  description: z.string().min(1, { message: "Description is required" }),
  file: z
    .instanceof(File)
    .refine(
      (file) =>
        file &&
        ["video/mp4", "video/webm", "video/quicktime", "video/x-msvideo", "video/x-ms-wmv", "video/x-flv", "video/mpeg", "video/avchd"].includes(
          file.type
        ),
      {
        message:
          "The uploaded file must be a video in one of the following formats: mp4, webm, mov, avi, wmv, flv, mpeg-4, avchd",
      }
    )
    .nullable(),
});

const Formulaire: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const videoRefSmallScreen = useRef<HTMLVideoElement>(null);
  const videoRefLargeScreen = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(formulaireSchema),
  });

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFile(file);
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setVideoPreview(previewURL);
      setTimeout(() => {
        if (videoRefSmallScreen.current) {
          videoRefSmallScreen.current.src = previewURL;
          videoRefSmallScreen.current.play();
        }
        if (videoRefLargeScreen.current) {
          videoRefLargeScreen.current.src = previewURL;
          videoRefLargeScreen.current.play();
        }
      }, 0);
    } else {
      setVideoPreview(null);
    }
  };

  const synchronizePlayPause = (sourceRef: React.RefObject<HTMLVideoElement>, targetRef: React.RefObject<HTMLVideoElement>) => {
    if (!sourceRef.current || !targetRef.current) return;

    // Synchronize play and pause between video elements
    sourceRef.current.onplay = () => {
      targetRef.current?.play();
    };
    sourceRef.current.onpause = () => {
      targetRef.current?.pause();
    };
  };

  useEffect(() => {
    if (videoPreview) {
      synchronizePlayPause(videoRefSmallScreen, videoRefLargeScreen);
      synchronizePlayPause(videoRefLargeScreen, videoRefSmallScreen);
    }
  }, [videoPreview]);

  const onSubmit = (data: any) => {
    toast({
      title: "Success",
      description: "Form submitted successfully",
    });
    console.log("Form data:", data);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center bg-gray-50 min-h-screen p-4">
  <div className="order-2 lg:order-1 bg-white shadow-md rounded-lg p-8 w-full h-full lg:w-3/4 lg:ml-8 mt-8 lg:mt-0 max-w-3xl">
    <h1 className="text-2xl font-semibold mb-6">
      Formulaire d'enregistrement de nouveaux clients
    </h1>
    <form
      className="h-full lg:max-h-[80vh] lg:overflow-y-auto overflow-hidden"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Username <span className="text-red-500">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Enter your username"
          {...register("username")}
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message as React.ReactNode}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
          URL <span className="text-red-500">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="url"
          type="url"
          placeholder="Enter the URL of your social networks"
          {...register("url")}
        />
        {errors.url && <p className="text-red-500 text-sm">{errors.url.message as React.ReactNode}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Describe yourself in a few words <span className="text-red-500">*</span>
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          placeholder="Tell us a little about yourself"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message as React.ReactNode}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-xl font-semibold">Upload a Welcome Video</label>
        <div
          className="relative flex items-center justify-center w-full h-28 p-10 border-2 border-dashed rounded-lg cursor-pointer bg-gradient-to-r from-pink-200 via-white to-cyan-200 animate-gradient-x"
        >
          <input
            type="file"
            accept=".mp4, .webm, .mov, .avi, .wmv, .flv, .mpeg, .avchd"
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
        {errors.file && <p className="text-red-500 text-sm">{errors.file.message as React.ReactNode}</p>}
        
        {videoPreview && (
          <div className="block lg:hidden mb-4 mt-4">
            <label className="block mb-2">Video Preview</label>
            <video
              ref={videoRefSmallScreen}
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

      <div className="mb-4">
      <label className="block mb-2 text-xl font-semibold">Upload your file PDF</label>
        <FileUpload />
      </div>

      <Button type="submit">Submit</Button>
    </form>
  </div>

  <div className="order-1 lg:order-2 w-full lg:w-1/4 lg:ml-8 lg:mt-0">
    <BackgroundGradient>
      <div className="bg-white shadow-md rounded-lg p-8 w-full">
        <label className="block mb-2 text-center font-semibold">Simple video welcome</label>
        <video
          className="w-full h-full object-cover rounded-xl"
          autoPlay
          loop
          muted
          src="/video/1.mp4"
        ></video>
      </div>
    </BackgroundGradient>

    {videoPreview && (
      <div className="hidden lg:block mt-8">
        <BackgroundGradient>
          <div className="bg-white shadow-md rounded-lg p-8 w-full">
          <label className="block mb-2 text-center font-semibold">Video Preview</label>
        <video
          ref={videoRefLargeScreen}
          className="w-full h-full object-cover rounded-xl"
          autoPlay
          loop
          controls
          src={videoPreview}
        ></video>
      </div>
        </BackgroundGradient>
      </div>
    )}
  </div>
</div>

  );
};

export default Formulaire;
