"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { IoWarningOutline } from "react-icons/io5";

const Input = () => {
  const { data: session } = useSession();
  const imagePickRef = useRef(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(null);

  const addImageToPost = (ev) => {
    setImageUploadError(null);
    setSelectedFile(null);
    const file = ev.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setImageUploadError("Image size must be less than 2MB");
        return;
      }
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImageToFirebaseStorage = () => {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectedFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is" + progress + "% done");
      },
      (error) => {
        console.log(error);
        setImageFileUploading(false);
        setImageFileUrl(null);
        selectedFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
          setImageFileUploading(false);
        });
      }
    );
  };

  useEffect(() => {
    if (selectedFile) {
      uploadImageToFirebaseStorage();
    }
  }, [selectedFile]);

  if (!session) return null;

  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3 w-full">
      {/* eslint-disable-next-line */}
      <img
        src={session.user.image}
        alt="user-img"
        className="size-11 rounded-full cursor-pointer hover:brightness-95 transition-all duration-200"
      />

      <div className="w-full divide-y divide-gray-200">
        <textarea
          placeholder="Whats happening..."
          rows="2"
          className="w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700"
        ></textarea>

        {selectedFile && (
          <>
            {/* eslint-disable-next-line */}
            <img
              src={imageFileUrl}
              alt="post-image"
              className="w-full max-h-[250px] object-cover cursor-pointer"
            />
          </>
        )}

        <div className="flex justify-between items-center pt-2.5">
          <HiOutlinePhotograph
            onClick={() => imagePickRef.current.click()}
            className="size-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer"
          />

          {imageUploadError && (
            <p className="text-gray-400 text-sm flex items-center gap-1">
              <IoWarningOutline />
              {imageUploadError}
            </p>
          )}

          <input
            type="file"
            ref={imagePickRef}
            accept="image/*"
            onChange={addImageToPost}
            hidden
          />

          <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
