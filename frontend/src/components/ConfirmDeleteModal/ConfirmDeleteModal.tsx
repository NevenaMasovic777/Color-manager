import { toast } from "react-toastify";
import IColor from "../../interfaces/IColor";
import { useColorStore } from "../../store/color";

export default function ConfirmDeleteModal({
  color,
  isOpen,
  setOpen,
}: {
  color: IColor;
  isOpen?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { deleteColor } = useColorStore();

  function handleCancel() {
    setOpen(false);
  }

  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const { success, message } = await deleteColor(color.id!);
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  }

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Are you sure you want to delete this item?
            </h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">
                This action cannot be undone.
              </p>
            </div>
            <div className="items-center px-4 py-3">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Yes
              </button>
              <button
                onClick={handleCancel}
                className="ml-3 px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
