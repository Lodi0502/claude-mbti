import { useEffect } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
  durationMs?: number;
}

export function Toast({ message, onClose, durationMs = 2000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, durationMs);
    return () => clearTimeout(timer);
  }, [onClose, durationMs]);

  return (
    <div className="toast" role="status">
      {message}
    </div>
  );
}
