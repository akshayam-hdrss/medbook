"use client";

const BookingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Booking Information</h2>
        <p>Our booking feature is coming soon! We'll notify you when it's available.</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-kaavi text-white rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;