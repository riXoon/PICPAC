import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({
  show,
  title = "Notice",
  message,
  onConfirm,
  onClose,
  confirmText = "OK",
  cancelText = null, // If provided, a Cancel button appears
}) {
  return (
    <AnimatePresence>
      {show && (
        <div
          className="fixed inset-0 bg-black/25 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white text-gray-800 rounded-2xl px-6 py-8 max-w-sm w-full shadow-xl text-center"
          >
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-sm text-gray-600 mb-6 whitespace-pre-wrap">{message}</p>

            <div className={`flex ${cancelText ? "justify-between" : "justify-center"} gap-4`}>
              {cancelText && (
                <button
                  onClick={onClose}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-full transition"
                >
                  {cancelText}
                </button>
              )}
              <button
                onClick={() => {
                  if (onConfirm) onConfirm();
                  if (onClose) onClose();
                }}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded-full transition"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
