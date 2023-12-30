"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export function RenameModal() {
  const [isRenameModalOpen, setIsRenameModalOpen, fileId, setFileId] =
    useAppStore((state) => [
      state.isRenameModalOpen,
      state.setIsRenameModalOpen,
      state.fileId,
      state.setFileId,
    ]);
  const { user } = useUser();
  const [newFilename, setNewFilename] = useState("");

  async function renameFile() {
    if (!user || !fileId || !newFilename) return;

    toast({
      variant: "default",
      title: "Renaming file...",
      description: "Please wait while we rename your file.",
      action: <ToastAction altText="Try again">Try again</ToastAction>
    });
    
    await updateDoc(doc(db, "users", user.id, "files", fileId), {
      filename: newFilename,
    }).then(() => {
      console.log("Document successfully updated!");
    }).finally(() => {
      setIsRenameModalOpen(false);

      toast({
        variant: "default",
        title: "File Renamed!",
        description: "Your file has been renamed successfully.",
      });
    });
  }

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => {
        setNewFilename("");
        setIsRenameModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename</DialogTitle>
          <DialogDescription>
            What would you like to rename your file to?
          </DialogDescription>
        </DialogHeader>

        <div className="flex space-x-2 py-3">
          <input
            type="text"
            className="px-3 flex-1 border rounded-md"
            value={newFilename}
            onChange={(e) => setNewFilename(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") renameFile();
            }}
          />
        </div>

        <div className="flex space-x-2 py-3">
          <Button
            type="submit"
            size="sm"
            className="px-3 flex-1"
            onClick={() => renameFile()}
          >
            <span className="sr-only">Rename</span>
            <span>Rename</span>
          </Button>

          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"outline"}
            onClick={() => setIsRenameModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
