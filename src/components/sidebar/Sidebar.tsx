import { useState } from "react";
import { type Board } from "../../api/boardApi";
import { ProjectFormModal } from "./ProjectFormModal";
import { useBoards } from "../../hooks/useBoards";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";

interface SideBarProps {
  boards: Board[];
  onBoardClick: (boardId: number) => void;
}

export const SideBar = ({ boards, onBoardClick }: SideBarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boardToEdit, setBoardToEdit] = useState<Board | null>(null);

  const { deleteBoardMutation } = useBoards();

  return (
    <div className="w-64 h-full bg-slate-700 text-white flex flex-col">
      <div className="flex items-center justify-between p-5 border-b border-slate-500">
        <div className="flex gap-2 items-center">
          <img
            src="https://i.pravatar.cc/100?img=3"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <h2 className="font-bold text-white">Guest</h2>
        </div>

        <button>
          <HiOutlineDotsVertical className="text-white" />
        </button>
      </div>

      <div className="flex justify-between items-center p-4">
        <h2 className="font-bold">Projetos</h2>
        <button
          className="bg-slate-300 hover:bg-slate-500 font-bold text-black px-2 py-1 text-xs rounded"
          onClick={() => {
            setBoardToEdit(null);
            setIsModalOpen(true);
          }}
        >
          <FaPlus />
        </button>
      </div>

      <div className="pl-4 flex-1 overflow-y-auto">
        {boards.length === 0 ? (
          <p className="text-center text-gray-400 mt-4">Nenhum projeto</p>
        ) : (
          boards.map((board) => (
            <div
              key={board.id}
              className="group flex justify-between items-center px-4 py-2 hover:bg-slate-600 cursor-pointer"
            >
              <button
                className="flex-1 text-left"
                onClick={() => onBoardClick(board.id)}
              >
                {board.name}
              </button>

              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="text-xs text-white"
                  onClick={() => {
                    setBoardToEdit(board);
                    setIsModalOpen(true);
                  }}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-xs text-white"
                  onClick={() => deleteBoardMutation.mutate(board.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex flex-col items-center text-center justify-center py-2">
        <p className="text-yellow-500">
          Versão de desenvolvimento <br /> Duvidas entre em contato <br />
          <a
            href="mailto:yuri.a.santos12@gmail.com"
            className="underline text-white"
          >
            yuri.a.santos12@gmail.com
          </a>
        </p>
      </div>

      <ProjectFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        board={boardToEdit}
      />
    </div>
  );
};
