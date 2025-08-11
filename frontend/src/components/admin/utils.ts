import toast from 'react-hot-toast';

export const showErrorToast = (baseMessage: string, error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  toast.error(`${baseMessage} ${errorMessage}`);
};

export const showSuccessToast = (message: string) => {
  toast.success(message);
};

export const formatDateForInput = (date: string | Date | undefined): string => {
  if (!date) return new Date().toISOString().split('T')[0];
  return new Date(date).toISOString().split('T')[0];
};

export const createErrorHandler = (baseMessage: string) => {
  return (error: unknown) => showErrorToast(baseMessage, error);
};