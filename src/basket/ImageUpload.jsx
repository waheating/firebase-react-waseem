import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../firebase/firebase';
import toast from "react-hot-toast";
import AutoSendSummary from './AutoSendSummary';


const ImageUpload = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const [images, setImages] = useState([null, null, null, null]);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  const referenceCode = code;

  // Check if folder already has images
  useEffect(() => {
    const checkIfImagesExist = async () => {
      const folderRef = ref(storage, `images/${code}/`);
      try {
        const result = await listAll(folderRef);
        if (result.items.length > 0) {
          alert("Images are already received for this code.");
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.error("Error checking existing images:", error);
      }
    };

    checkIfImagesExist();
  }, [code, navigate]);

  const handleImageChange = (index, file) => {
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);
  };

  const handleUpload = async () => {
    const filesToUpload = images.filter((img) => img !== null);
    if (filesToUpload.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    setUploading(true);
    const urls = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (!image) continue;

      const imageRef = ref(storage, `images/${code}/${image.name}`);
      try {
        await uploadBytes(imageRef, image);
        const downloadURL = await getDownloadURL(imageRef);
        urls.push(downloadURL);
      } catch (err) {
        console.error(err);
        toast.error(`❌ Failed to upload image ${i + 1}`);
      }
    }

    setUploadedUrls(urls);
    setUploading(false);
    
    alert("Upload complete!");
    navigate("/", { replace: true });
  };

  

  return (
    <div className="max-w-md mx-auto p-6 space-y-4 bg-white shadow rounded-xl border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800">
        Upload 4 Images for Code: <span className="text-blue-600">{code}</span>
        <AutoSendSummary referenceCode={referenceCode} />
      </h2>

      {[0, 1, 2, 3].map((index) => (
        <div key={index} className="space-y-1">
          <label className="block font-medium text-gray-700">Image {index + 1}</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(index, e.target.files[0])}
            disabled={uploading}
            className="block w-full border rounded p-1"
          />
        </div>
      ))}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
      >
        {uploading ? "Uploading..." : "Upload All Images"}
      </button>

      {uploadedUrls.length > 0 && (
        
        <div className="mt-4 text-sm text-green-600 space-y-1">
          <p>Uploaded URLs:</p>
          


          {uploadedUrls.map((url, i) => (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block break-all underline"
            >
              {url}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
