"use client";
import React, { useState } from "react";
import { Modal } from "../ui/modal";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface HeaderProps {
  modalButtonText?: string;
  modalButtonLinkText?: string;
  linkPath?: string;
  modalContent?: React.ReactNode;
}

export const Header = ({
  modalButtonText,
  modalButtonLinkText,
  linkPath,
  modalContent,
}: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="py-4 bg-white shadow mb-6">
      <div className="container flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Quiz App
          </Link>
        </h1>
        <div className="flex gap-4">
          {modalButtonLinkText && linkPath && (
            <Button
              text={modalButtonLinkText}
              onClick={() => router.push(linkPath)}
            />
          )}
          {modalContent && (
            <>
              <Button
                text={modalButtonText as string}
                onClick={() => setOpen(true)}
                icon={<Plus size={18} />}
              />

              <Modal isOpen={open} onClose={() => setOpen(false)}>
                <h2 className="text-xl font-bold mb-6">Create quiz</h2>
                {modalContent}
              </Modal>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
