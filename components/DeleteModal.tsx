"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import { deleteObject, ref } from "firebase/storage"
import { db, storage } from "@/firebase"
import { deleteDoc, doc } from "firebase/firestore"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export function DeleteModal() {
    const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] = useAppStore((state) => [state.isDeleteModalOpen, state.setIsDeleteModalOpen, state.fileId, state.setFileId]);
    const { user } = useUser();

    async function deleteFile() {
        if (!user || !fileId) return;

        const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

        toast({
            variant: "default",
            title: "Deleting file...",
            description: "Please wait while we delete your file.",
            action: <ToastAction altText="Try again">Try again</ToastAction>
        });

        await deleteObject(fileRef).then(async () => {
            deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() => {
                console.log("Document successfully deleted!");
            })
        }).finally(() => {
            setIsDeleteModalOpen(false);
        })

        toast({
            variant: "destructive",
            title: "File Deleted!",
            description: "Your file has been deleted successfully.",
        });
    }

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={(isOpen) => {
        setIsDeleteModalOpen(isOpen);
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your file. Do you want to continue?
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex space-x-2 py-3">
            <Button variant={"destructive"} type="submit" size="sm" className="px-3 flex-1" onClick={() => deleteFile()}>
                <span className="sr-only">Delete</span>
                <span>Delete</span>
            </Button>
            
            <Button size="sm" className="px-3 flex-1" variant={"outline"} onClick={() => setIsDeleteModalOpen(false)}>
                <span className="sr-only">Cancel</span>
                <span>Cancel</span>
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
