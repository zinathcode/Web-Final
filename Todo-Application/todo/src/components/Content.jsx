/* eslint-disable react/prop-types */
import { parseAbsoluteToLocal } from "@internationalized/date";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { Circle, CircleCheckBig, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import useStore from "../state/store";
import { formatDate } from "../utils/formateDate";
import { pickPriority } from "../utils/getPriority";
const Content = ({ data }) => {
    const { task, date, priority, isCompleted, _id } = data;
    const { deleteTask, setIsEditEnabled, setIsCompleted, setFormData } =
        useStore();

    const handleDelete = async (taskId) => {
        deleteTask(taskId);
        toast.warning("Todo Deleted");
        await axios.delete(
            `https://new-todo-backend.onrender.com/api/delete/${_id}`
        );
    };

    const handleEditTask = () => {
        setFormData({
            task,
            date: parseAbsoluteToLocal(date),
            priority,
            _id,
        });
        setIsEditEnabled(true);
    };

    const handleComplete = async (taskId) => {
        setIsCompleted(taskId);
        if (!isCompleted) {
            toast.success(`Todo marked as completed`);
        } else {
            toast.warning(`Todo marked as incomplete`);
        }
        await axios.patch(
            `https://new-todo-backend.onrender.com/api/complete/${_id}`
        );
    };

    return (
        <>
            <div className="flex items-center justify-between bg-white py-3 px-5 rounded-lg mb-3">
                <div className="flex items-center gap-5">
                    {pickPriority(priority)}
                    <p
                        className={`${
                            isCompleted ? "line-through" : ""
                        } title text-lg font-normal`}
                    >
                        {task}
                    </p>
                </div>
                <div className="flex items-center gap-10">
                    <p className={`data `}>
                        {formatDate(parseAbsoluteToLocal(date))}
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            startContent={
                                isCompleted ? (
                                    <CircleCheckBig className="w-5 h-5" />
                                ) : (
                                    <Circle className="w-5 h-5" />
                                )
                            }
                            isIconOnly={true}
                            radius="full"
                            className={`${
                                isCompleted
                                    ? "text-green-700"
                                    : "text-[#706f81] "
                            }`}
                            onClick={() => handleComplete(_id)}
                        />
                        <Button
                            startContent={<Pencil className="w-5 h-5" />}
                            isIconOnly={true}
                            radius="full"
                            className="text-[#706f81]"
                            onClick={handleEditTask}
                        />
                        <Button
                            startContent={<Trash2 className="w-5 h-5" />}
                            isIconOnly={true}
                            radius="full"
                            className="text-red-600"
                            onClick={() => handleDelete(_id)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Content;
