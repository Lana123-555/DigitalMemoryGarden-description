import React from "react";
import { CSS_CLASSES } from "./constants";

interface FileUploadFieldProps {
  name: string;
  label: string;
  accept?: string;
  required?: boolean;
  onFileChange: (file: File | null) => void;
}

export default function FileUploadField({
  name,
  label,
  accept,
  required = false,
  onFileChange,
}: FileUploadFieldProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0] || null;
    onFileChange(file);
  };

  return (
    <div>
      <label htmlFor={name} className={CSS_CLASSES.LABEL}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="file"
        name={name}
        accept={accept}
        onChange={handleFileChange}
        className={CSS_CLASSES.INPUT}
        required={required}
      />
    </div>
  );
}
