import { useState } from "react";

interface PopupProps {
  title: string; // Title of the popup
  isVisible: boolean; // Whether the popup is visible
  onClose: () => void; // Function to close the popup
  onSubmit: (inputValue: string) => void; // Function to handle the submitted input
}

export default function Popup({
  title,
  isVisible,
  onClose,
  onSubmit,
}: PopupProps) {
  const [inputValue, setInputValue] = useState(""); // State to hold the input value

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value); // Update state with the input value
  };

  const handleSubmit = () => {
    onSubmit(inputValue); // Pass the input value to the onSubmit function
    setInputValue(""); // Clear the input field
    onClose(); // Close the popup
  };

  if (!isVisible) return null; // Don't render if the popup is not visible

  return (
    <div className="popup fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="popup-dialog bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <textarea
          className="w-full h-24 border p-2 rounded mb-4"
          placeholder="Write your review here..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
