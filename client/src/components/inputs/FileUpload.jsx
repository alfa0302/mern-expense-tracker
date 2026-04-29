import React, { useRef, useState } from "react";
import { FaUser } from "react-icons/fa";

export default function FileUpload({ name, onChange }) {
  const uploadRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const selectFileUpload = () => {
    uploadRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
    // propagating change to parent
    onChange(e);
  };
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-center">
        <button
          className="w-18 flex justify-center cursor-pointer"
          type="button"
          onClick={selectFileUpload}
        >
          {preview ? (
            <img src={preview} className="h-full w-full rounded-full" />
          ) : (
            <FaUser className="border border-deep rounded-full p-2 text-deep font-medium w-full h-full" />
          )}
        </button>
      </div>

      <input
        type="file"
        name={name}
        accept="image/*"
        className="border rounded-md p-2 hidden"
        ref={uploadRef}
        onChange={handleFileChange}
      />
    </div>
  );
}
