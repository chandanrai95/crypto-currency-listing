import React, { JSX, MouseEventHandler, useMemo } from "react";

interface ModalProps {
  isOpen: boolean,
  onClose?: MouseEventHandler<HTMLButtonElement>,
  children: JSX.Element,
  leftHeader: Function
}

const Modal = ({ isOpen, onClose, children, leftHeader }: ModalProps) => {
  if (!isOpen) return null;

  const leftH = useMemo(() => {
    if (leftHeader) {
      return leftHeader()
    }
    return (
      <h1
      className="font-bold text-xl"
    >
      Details
    </h1>
    )
  },[])

  return (
    <div className="fixed inset-0 bg-black/20  flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-xl shadow-lg relative">
        <div
          className="flex justify-between"
        >
         {leftH}
          <button
            onClick={onClose}
            className=" top-3 right-6 text-gray-500 hover:text-black cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div
          className="flex flex-1 mt-5 min-h-50"
        >

          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal