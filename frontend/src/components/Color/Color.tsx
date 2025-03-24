import { useState } from "react";
import IColor from "../../interfaces/IColor";
import EditModal from "../EditModal/EditModal";
import { useTextColor } from "../../hooks/useTextColor";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

export default function Color({ color }: { color: IColor }) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);

  const { name, hex } = color;
  const textColor = useTextColor(hex);

  function handleEdit() {
    setOpenEditModal(true);
  }

  function handleDelete() {
    setOpenDeleteConfirmModal(true);
  }

  return (
    <>
      <div
        className="rounded-lg flex justify-between items-center p-4 mt-8 mr-8 ml-8 border border-black"
        style={{ backgroundColor: hex, color: textColor }}
      >
        <div
          className="group relative w-48 truncate cursor-pointer"
          title={name}
        >
          <span className="truncate">{name}</span>
        </div>
        <p>{hex}</p>
        <div className="flex justify-between items-center gap-4">
          <button onClick={handleEdit}>
            <PencilIcon className={`h-6 w-6 ${textColor}`} />
          </button>
          <button onClick={() => handleDelete()}>
            <TrashIcon className={`h-6 w-6 ${textColor}`} />
          </button>
        </div>
      </div>
      <EditModal
        color={color}
        isOpen={openEditModal}
        setOpen={setOpenEditModal}
      />
      <ConfirmDeleteModal
        color={color}
        isOpen={openDeleteConfirmModal}
        setOpen={setOpenDeleteConfirmModal}
      />
    </>
  );
}
