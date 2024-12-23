import { parseAbsoluteToLocal } from "@internationalized/date";
import { useEffect } from "react";

import Content from "./components/Content";
import Form from "./components/Form";
import Layout from "./components/layout";
import useStorage from "./hooks/useStorage";
import useStore from "./state/store";

function App() {
    const { setData, datas, filter: taskFilter } = useStore();
    const { value } = useStorage("tasks", []);

    useEffect(() => {
        value?.forEach((v) => {
            setData({
                ...v,
                date: parseAbsoluteToLocal(v.date),
            });
        });
    }, [value, setData]);

    return (
        <>
            <Layout>
                <main className="bg-[#a18aff] ">
                    <div className="lg:pl-72">
                        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
                            {/* <!-- Main area --> */}
                            <div className="container w-full lg:w-2/3">
                                <h1 className="heading text-xl md:text-2xl lg:text-4xl font-semibold text-white pb-10">
                                    Your Daily Tasks!
                                </h1>

                                <Form />

                                {datas?.length > 0 ? (
                                    datas
                                        ?.filter((v) => {
                                            if (v.priority == taskFilter) {
                                                return v;
                                            }
                                            if (taskFilter == "all") {
                                                return v;
                                            }
                                        })
                                        ?.map((data) => (
                                            <Content
                                                key={data.id}
                                                data={data}
                                            />
                                        ))
                                ) : (
                                    <p>No Todo Left</p>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        </>
    );
}

export default App;
