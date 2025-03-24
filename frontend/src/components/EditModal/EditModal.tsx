import IColor from "../../interfaces/IColor";
import { useColorStore } from "../../store/color";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ColorForm from "../ColorForm/ColorForm";

export default function EditModal({
  color,
  isOpen,
  setOpen,
}: {
  color: IColor;
  isOpen?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { reset } = useForm();
  const { updateColor } = useColorStore();

  function handleCancel() {
    setOpen(false);
  }

  async function onSubmit(data: IColor) {
    const { success, message } = await updateColor(color.id!, data);
    if (success) {
      reset(data);
      setOpen(false);
      toast.success(message);
    } else {
      toast.error(message);
      return;
    }
  }

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
          <ColorForm onSubmit={onSubmit} defaultValues={color} />
          <button
            type="button"
            className="btn-secondary mt-4 w-full"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    )
  );
}
