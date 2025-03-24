import { useForm } from "react-hook-form";
import IColor from "../../interfaces/IColor";

interface ColorFormProps {
  defaultValues: IColor;
  onSubmit: (data: IColor) => void;
}

export default function ColorForm({ defaultValues, onSubmit }: ColorFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<IColor>({
    defaultValues,
  });

  type FormFieldNames = "name" | "hex";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValue(name as FormFieldNames, value, { shouldDirty: true });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 flex items-center gap-4">
        <label htmlFor="color-input">Select color</label>
        <div className="mt-1 overflow-hidden w-10 h-10 border border-gray-300 rounded-md shadow-sm">
          <input
            id="color-input"
            className="rounded-md cursor-pointer border-none appearance-none p-0"
            type="color"
            {...register("hex", {
              onChange: handleChange,
            })}
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="color-name">Color name</label>
        <input
          id="color-name"
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
            errors.name
              ? "border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              : "border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-900 focus:border-purple-900"
          }`}
          type="text"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
            onChange: handleChange,
          })}
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>
      <button
        className={`w-full btn-primary ${!isDirty && `btn-disabled`}`}
        disabled={!isDirty}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
