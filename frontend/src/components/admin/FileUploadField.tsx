import React from 'react';
import { CSS_CLASSES } from './constants';

interface FileUploadFieldProps {
  name: string;
  label: string;
  accept?: string;
  multiple?: boolean;
  onChange: (files: File[]) => void;
}

export function FileUploadField({ 
  name, 
  label, 
  accept, 
  multiple = false, 
  onChange 
}: FileUploadFieldProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files || []);
    onChange(files);
  };

  return (
    <div>
      <label htmlFor={name} className={CSS_CLASSES.LABEL}>
        {label}
      </label>
      <input
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className={CSS_CLASSES.INPUT}
      />
    </div>
  );
}