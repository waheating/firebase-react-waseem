import { Button } from "./Button";

export default function GasWarningModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm mx-auto">
        <h3 className="text-lg font-semibold mb-4 text-red-400">Sorry</h3>
        <p className="mb-4">We don't provide service for boilers that don't work on main gas.</p>
        <Button 
          onClick={onClose}
          className="w-full"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}


