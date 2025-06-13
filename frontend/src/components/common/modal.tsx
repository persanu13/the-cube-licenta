import React from "react";

type ModalProps = {
  message: string;
  onClose: () => void;
  action: (payload: FormData) => void;
};

export default function DeleteModal({ message, onClose, action }: ModalProps) {
  return (
    <div className="fixed top-0 left-0  w-screen h-screen flex justify-center items-center z-50 ">
      <div className="flex flex-col gap-5 bg-bej-50 px-4 py-4 rounded border-2 border-carnation-400 text-tuatara-900 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <h1 className="font-hanuman  text-[18px]">{message}</h1>
        <div className="flex  justify-between px-2">
          <button
            className="px-3 py-[6px] bg-border cursor-pointer rounded-[4px] text-[16px] font-inter font-semibold text-bej-100 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:opacity-80"
            onClick={onClose}
          >
            No
          </button>
          <form action={action}>
            <button
              type="submit"
              className="px-3 py-[6px] bg-carnation-400 cursor-pointer rounded-[4px] text-[16px] font-inter font-semibold text-bej-100 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:opacity-80"
            >
              Yes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
