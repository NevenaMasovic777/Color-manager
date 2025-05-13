import { useColorStore } from "../../store/color";
import { useNavigate } from "react-router-dom";
import IColor from "../../interfaces/IColor";
import { toast } from "react-toastify";
import ColorForm from "../../components/ColorForm/ColorForm";

export default function CreateColor() {
  const navigate = useNavigate();
  const { createColor } = useColorStore();

  async function onSubmit(data: IColor) {
    const { success, message } = await createColor(data);
    if (success) {
      navigate("/");
      toast.success(message);
    } else {
      toast.error(message);
    }
  }

  return (
    <div className="flex justify-center items-start p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-8 mb-8">
        <ColorForm
          onSubmit={onSubmit}
          defaultValues={{ hex: "#FFFFFF", name: "" }}
        />
      </div>
    </div>
  );
}
