import { ListTodo } from "lucide-react";
import useStore from "../../state/store";

const SidebarMain = () => {
    const { setFilter, filter } = useStore();

    return (
        <>
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-1">
                            <li>
                                <button
                                    onClick={() => setFilter("all")}
                                    className={`text-gray-700 w-full hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                                        filter == "all" &&
                                        "bg-gray-50 text-indigo-600"
                                    }`}
                                >
                                    <ListTodo />
                                    All Tasks
                                </button>

                                <ul
                                    role="list"
                                    className="-mx-2 mt-2 space-y-1 ml-10"
                                >
                                    <li>
                                        <button
                                            onClick={() => setFilter("high")}
                                            className={`text-gray-700 w-full hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                                                filter == "high" &&
                                                "bg-gray-50 text-indigo-600"
                                            }`}
                                        >
                                            <span
                                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white text-gray-400 border-gray-200 group-hover:border-indigo-600 ${
                                                    filter == "high" &&
                                                    "border-indigo-600"
                                                } group-hover:text-indigo-600`}
                                            >
                                                <div className="bg-rose w-3 h-3 rounded-full"></div>
                                            </span>
                                            <span className="truncate">
                                                High
                                            </span>
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setFilter("medium")}
                                            className={`text-gray-700 w-full hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                                                filter == "medium" &&
                                                "bg-gray-50 text-indigo-600"
                                            }`}
                                        >
                                            <span
                                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white text-gray-400 border-gray-200 group-hover:border-indigo-600 ${
                                                    filter == "medium" &&
                                                    "border-indigo-600"
                                                } group-hover:text-indigo-600`}
                                            >
                                                <div className="bg-tarquoise w-3 h-3 rounded-full"></div>
                                            </span>
                                            <span className="truncate">
                                                Medium
                                            </span>
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setFilter("low")}
                                            className={`text-gray-700 w-full hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                                                filter == "low" &&
                                                "bg-gray-50 text-indigo-600"
                                            }`}
                                        >
                                            <span
                                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white text-gray-400 border-gray-200 group-hover:border-indigo-600 ${
                                                    filter == "low" &&
                                                    "border-indigo-600"
                                                } group-hover:text-indigo-600`}
                                            >
                                                <div className="bg-gold w-3 h-3 rounded-full"></div>
                                            </span>
                                            <span className="truncate">
                                                Low
                                            </span>
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default SidebarMain;
