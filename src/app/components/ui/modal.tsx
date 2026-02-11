"use client";
import { CircleX } from "lucide-react";
import { useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  function handleClickOutside(event: React.MouseEvent<HTMLDivElement>) {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onClose();
    }
  }

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleClickOutside}
    >
      <div
        ref={ref}
        className="relative w-full max-w-2xl mx-4 rounded bg-white shadow-xl max-h-[calc(100vh-4rem)] overflow-auto"
      >
        <CircleX
          size={22}
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition cursor-pointer"
        />

        <div className="p-4 pt-8">{children}</div>
      </div>
    </div>,
    document.body,
  );
};
