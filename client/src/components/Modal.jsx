import React from "react";
import { IoClose } from "react-icons/io5";

export default function Modal({ onClose, title, isOpen, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-transparent backdrop-blur-sm border">
      <div className="lg:w-[50%] w-full rounded-lg p-10 border-t  border-gray-300 shadow-2xl bg-white overflow-auto max-h-[90vh]">
        <div className="border-b border-b-seafoam flex justify-between items-center pb-5">
          <div className="flex flex-col">
            <h3 className="text-md font-semibold text-charcoal">{title}</h3>
            <p className="pt-2 text-gray-500 text-sm">
              Add your earning information below
            </p>
          </div>
          <button
            onClick={() => onClose()}
            className="text-charcoal text-xl cursor-pointer bg-gray-200 rounded-full p-1"
            type="button"
          >
            <IoClose />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
