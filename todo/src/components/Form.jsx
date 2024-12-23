import { parseAbsoluteToLocal } from "@internationalized/date";
import { Button, DatePicker, Select, SelectItem } from "@nextui-org/react";
import { Calendar, Plus } from "lucide-react";
import { useRef } from "react";
import { toast } from "react-toastify";
import useStorage from "../hooks/useStorage";
import useStore from "../state/store";
import { pickPriority } from "../utils/getPriority";

const Form = () => {
    const {
        setData,
        formData,
        setFormData,
        isEditEnabled,
        updatedTask,
        setIsEditEnabled,
        datas,
    } = useStore();
    const { setValueToStorage, value } = useStorage("tasks", []);
    const formRef = useRef(null);

    const handleOnChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleDate = (event) => {
        setFormData({
            ...formData,
            date: event,
        });
    };

    const handleCreateTask = (e) => {
        e.preventDefault();

        if (formData.task === "") {
            return toast.error("Please enter a Todo Title");
        }

        setData(formData);

        const storageValue = [
            ...value,
            {
                ...formData,
                date: formData.date.toAbsoluteString(),
            },
        ];
        setValueToStorage(storageValue);
        toast.success("Todo Added");

        setFormData({
            priority: "high",
            task: "",
            date: parseAbsoluteToLocal(new Date().toISOString()),
            isCompleted: false,
        });
        formRef.current.focus();
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();

        updatedTask(formData.id, formData);

        const updatedv = await datas?.map((t) => {
            if (t.id === formData.id) {
                return {
                    ...t,
                    ...formData,
                    date: formData.date.toAbsoluteString(),
                };
            }
            return {
                ...t,
                date: t.date.toAbsoluteString(),
            };
        });
        setValueToStorage(updatedv);
        setIsEditEnabled(false);
        toast.success("Todo updated successfully");
        setFormData({
            priority: "high",
            task: "",
            date: parseAbsoluteToLocal(new Date().toISOString()),
            isCompleted: false,
        });
        formRef.current.focus();
    };

    return (
        <form
            className="w-full  mb-24"
            onSubmit={!isEditEnabled ? handleCreateTask : handleUpdateTask}
        >
            <div className="flex items-center gap-2 bg-white py-2 px-5 rounded-lg">
                <Select
                    startContent={
                        <div className="flex items-center gap-2">
                            {pickPriority(formData?.priority)}
                        </div>
                    }
                    defaultSelectedKeys={["high"]}
                    className="w-40 text-[#706f81]"
                    name="priority"
                    onChange={handleOnChange}
                    aria-label="priority"
                >
                    <SelectItem
                        startContent={
                            <div className="bg-rose w-3 h-3 rounded-full"></div>
                        }
                        key={"high"}
                        value={"high"}
                    >
                        High
                    </SelectItem>
                    <SelectItem
                        startContent={
                            <div className="bg-tarquoise w-3 h-3 rounded-full"></div>
                        }
                        key={"medium"}
                        value={"medium"}
                    >
                        Medium
                    </SelectItem>
                    <SelectItem
                        startContent={
                            <div className="bg-gold w-3 h-3 rounded-full"></div>
                        }
                        key={"low"}
                        value={"low"}
                    >
                        Low
                    </SelectItem>
                </Select>
                <input
                    className="py-4 text-lg w-full outline-none px-10"
                    type="text"
                    name="task"
                    placeholder="Add your next task"
                    onChange={handleOnChange}
                    ref={formRef}
                    value={formData?.task || ""}
                />
                <div className="flex items-center gap-2">
                    <div className="bg-white">
                        <DatePicker
                            selectorIcon={<Calendar />}
                            aria-label="date"
                            value={formData?.date}
                            onChange={(ZonedDateTime) =>
                                handleDate(ZonedDateTime)
                            }
                            granularity="day"
                            color="#ffffff"
                            className="text-[#706f81]"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-10 h-10 px-0 py-0 rounded-full text-[#706f81]"
                        aria-label="Add task"
                        startContent={<Plus />}
                        isIconOnly={true}
                        radius="full"
                    />
                </div>
            </div>
        </form>
    );
};

export default Form;
