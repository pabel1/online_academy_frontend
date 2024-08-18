import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ImageUpload({
  maxSize,
  id,
  accept,
  selectedFile,
  setSelectedFile,
}) {
  const [selectedFileName, setSelectedFileName] = useState();
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    let bytes = file.size;
    let fileSizeInMb = bytes / 1048576;

    if (fileSizeInMb > maxSize) {
      return toast.error(
        `The selected file size is ${fileSizeInMb.toFixed(
          1
        )} Mb! File size must be less than ${maxSize} Mb`
      );
    }

    if (file) {
      const extension = file.name.split(".").pop();
      setSelectedFileName(file.name);

      if (extension === "pdf") {
        // Handle PDF files
        setSelectedFile(file);
        setImagePreview(null);
      } else if (
        extension === "jpeg" ||
        extension === "jpg" ||
        extension === "png"
      ) {
        // Handle image files (JPEG or PNG)
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error(
          "Invalid file format. Please upload a PDF, JPEG, or PNG file."
        );
      }
    }
  };

  const handleCancelSelectedFile = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };

  return (
    <div data-aos="zoom-in" className="border-2 border-dashed rounded-md">
      <label
        htmlFor="file-upload"
        className="flex justify-center w-full mx-auto"
      >
        <div className="flex flex-col items-center justify-center w-full bg-white">
          {selectedFile ? (
            <>
              <div className="flex flex-row items-center">
                <div className="flex flex-col">
                  <label htmlFor="file-upload">
                    <img
                      className="w-60 h-36 rounded-md"
                      src={imagePreview}
                      alt="Image Preview"
                    />
                    <input
                      type="file"
                      id="file-upload"
                      accept={accept}
                      className="hidden"
                      onChange={(e) => handleFileUpload(e)}
                    />
                  </label>
                </div>
              </div>
            </>
          ) : (
            <form
              action="#"
              className="relative w-full max-w-xs rounded-sm px-8 py-14 grid grid-cols-1 h-full"
            >
              <input
                type="file"
                id="file-upload"
                accept={accept}
                className="hidden"
                onChange={(e) => handleFileUpload(e)}
              />
              <label
                htmlFor="file-upload"
                className="z-20 flex flex-col-reverse items-center justify-center w-full cursor-pointer"
              >
                <p className="z-10 text-xs font-light text-center text-gray-500">
                  Please upload image in JPEG or PNG format
                </p>
                <p className="z-10 text-[9px] font-light text-center text-gray-500">
                  Drag &amp; Drop your files here or{" "}
                  <span className="text-primaryColor">Browse</span>
                </p>
                <svg
                  className="z-10 w-8 h-8 text-[#11998E]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
              </label>
            </form>
          )}
        </div>
      </label>
    </div>
  );
}
