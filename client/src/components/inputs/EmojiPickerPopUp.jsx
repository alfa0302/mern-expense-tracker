import React, { useState } from "react";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { CiImageOn } from "react-icons/ci";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function EmojiPickerPopUp({ icon, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center gap-2" onClick={() => setIsOpen(true)}>
      {icon ? (
        <div className="rounded-lg w-10 h-10 bg-mint-cream flex items-center justify-center">
          <span className="text-2xl">{icon}</span>
        </div>
      ) : (
        <div className="text-deep bg-mint-cream rounded-lg w-10 h-10 p-1">
          <CiImageOn className="h-full w-full" />
        </div>
      )}
      <div className="text-sm text-charcoal cursor-pointer">
        {icon ? "Change Icon" : "Pick Icon"}
      </div>
      <div className="relative">
        <EmojiPicker
          open={isOpen}
          onEmojiClick={(emoji) => onSelect(emoji.emoji) || ""}
          className="w-full h-full"
        />
        {isOpen && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            type="button"
          >
            <IoCloseCircleOutline className="absolute right-1 top-1 h-5 w-5 cursor-pointer text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
}
