import { parseAbsoluteToLocal } from "@internationalized/date";
import { nanoid } from "nanoid";
import { create } from "zustand";

const useStore = create((set) => ({
    datas: [],
    formData: {
        priority: "high",
        task: "",
        date: parseAbsoluteToLocal(new Date().toISOString()),
        isCompleted: false,
    },
    isEditEnabled: false,
    filter: "all",
    isOpen: false,
    setData: (value) =>
        set((state) => ({
            datas: [
                ...state.datas,
                {
                    ...value,
                    id: nanoid(),
                },
            ],
        })),
    setIsCompleted: (id) =>
        set((state) => ({
            datas: state.datas.map((t) => {
                if (t.id === id) {
                    return {
                        ...t,
                        isCompleted: !t.isCompleted,
                    };
                }
                return t;
            }),
        })),
    updatedTask: (id, value) =>
        set((state) => ({
            datas: state.datas.map((t) => {
                if (t.id === id) {
                    return {
                        ...t,
                        ...value,
                    };
                }
                return t;
            }),
        })),
    setFilter: (value) =>
        set(() => ({
            filter: value,
        })),

    deleteTask: (id) =>
        set((state) => ({
            datas: state.datas.filter((data) => data.id !== id),
        })),
    setFormData: (value) =>
        set(() => ({
            formData: value,
        })),
    setIsEditEnabled: (value) =>
        set(() => ({
            isEditEnabled: value,
        })),
    setIsOpen: () =>
        set((state) => ({
            isOpen: !state.isOpen,
        })),
}));

export default useStore;
