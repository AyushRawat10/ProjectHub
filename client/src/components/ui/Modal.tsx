import type { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  className = "",
}: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-neutral/40 backdrop-blur-[2px]" 
        onMouseDown={onClose}
      />

      {/* Modal */}
      <div
        className={`relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-panel shadow-xl ${className}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-line p-5 sm:p-6">
          <div className="min-w-0">
            <h2
              id="modal-title"
              className="font-display text-xl font-semibold text-neutral"
            >
              {title}
            </h2>

            {description && (
              <p className="mt-1.5 text-sm leading-5 text-muted">
                {description}
              </p>
            )}
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="shrink-0 rounded-lg p-2 text-muted transition-colors hover:bg-secondary/50 hover:text-neutral"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto p-5 sm:p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex flex-col-reverse gap-2 border-t border-line bg-paper/50 p-5 sm:flex-row sm:justify-end sm:p-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}