"use client";
import React, { useState } from "react";
import axios from "axios";
import { NFT_STORAGE_API_KEY } from "@/util/Key";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page: React.FC = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [studentName, setStudentName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const showToast = (message: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleConnectMetamask = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic form validation
    if (!name || !subject || !studentName || !walletAddress || !image) {
      showToast("Please fill out all the required fields.", "error");
      return;
    }

    // Step 1: Upload image and metadata to nft.storage
    const formData = new FormData();
    formData.append("file", image as Blob);
    formData.append(
      "metadata",
      JSON.stringify({
        name,
        description: subject,
        studentName,
        walletAddress,
      })
    );

    try {
      const response = await axios.post(
        "https://api.nft.storage/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${NFT_STORAGE_API_KEY}`,
          },
        }
      );

      // Log the response for debugging (you can remove this in production)
      console.log("NFT Storage API Response:", response.data);

      // Display success message
      showToast("Image and metadata uploaded successfully!", "success");
      // You can add route to wanted pages
    } catch (error) {
      console.error("Error uploading image or metadata:", error);

      // Display error message
      showToast(
        "Error uploading image or metadata. Please try again.",
        "error"
      );
    }
  };
  return (
    <div className="p-6">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1 className="text-2xl">New Degree</h1>
      <div className="bg-gray-100 p-4 mt-4 rounded-md">
        <form onSubmit={handleConnectMetamask}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Name Of The Degree"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Subject/Stream/Branch
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              student&apos;s Name
            </label>
            <input
              type="text"
              id="student-name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Student Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              student&apos;s Wallet Address
            </label>
            <input
              type="text"
              id="student-name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Student Name"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Upload Image
            </label>
            <input
              onChange={handleFileChange}
              className="p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Connect Metamask
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
