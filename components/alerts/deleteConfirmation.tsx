import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { useToast } from "../ui/use-toast";
import axios from "axios";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
  resourceType: "product" | "category"; // Specify the resource type
  product?: any;
  category?: any;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  cancelText = "Cancel",
  confirmText = "Continue",
  resourceType,
  product,
  category,
}) => {
  const { toast } = useToast();

  const onConfirm = async () => {

    const _id = resourceType === "product" ? product && product._id : category?._id && category._id;


    try {
      const endpoint =
        resourceType === "product"
          ? `/api/products.api`
          : `/api/categories.api`;
      await axios.delete(endpoint, { data: { _id } });
      console.log(endpoint)
      console.log({_id})
      console.log("deleted");
    } catch (error) {
      console.error(`Error deleting ${resourceType}:`, error);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="capitalize">
            Are you sure you want to delete this {resourceType} named
            <span className="font-bold pl-1 capitalize text-black">{description}</span> from
            inventory?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
