/* eslint-disable react/prop-types */
import { Button } from "@nextui-org/react";
import { Circle, CircleCheckBig, Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useStorage from "../hooks/useStorage";
import useStore from "../state/store";
import { formatDate } from "../utils/formateDate";
import { pickPriority } from "../utils/getPriority";
const Content = ({ data }) => {
    const { id, task, date, priority, isCompleted } = data;
    const { datas, deleteTask, setIsEditEnabled, setIsCompleted, setFormData } =
        useStore();
    const { setValueToStorage, clearStorage } = useStorage("tasks", []);

    const handleDelete = (taskId) => {
        const updatedv = datas?.filter((t) => t.id !== taskId);
        const newValue = updatedv?.map((t) => ({
            ...t,
            date: t.date.toAbsoluteString(),
        }));

        setValueToStorage(newValue);
        deleteTask(taskId);
        toast.warning("Todo Deleted");
    };

    useEffect(() => {
        if (datas.length <= 0) {
            clearStorage();
        }
    }, [clearStorage, datas.length]);

    const handleEditTask = () => {
        setFormData({
            task,
            date,
            priority,
            id,
        });
        setIsEditEnabled(true);
    };

    const handleComplete = (taskId) => {
        setIsCompleted(taskId);

        const updatedv = datas?.map((t) => {
            if (t.id === taskId) {
                return {
                    ...t,
                    isCompleted: !t.isCompleted,
                    date: t.date.toAbsoluteString(),
                };
            }
            return {
                ...t,
                date: t.date.toAbsoluteString(),
            };
        });

        setValueToStorage(updatedv);

        if (!isCompleted) {
            toast.success(`Todo marked as completed`);
        } else {
            toast.warning(`Todo marked as incomplete`);
        }
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
                    <p className={`data `}>{formatDate(date)}</p>
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
                            onClick={() => handleComplete(id)}
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
                            onClick={() => handleDelete(id)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Content;
