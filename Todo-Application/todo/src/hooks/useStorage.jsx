import localforage from "localforage";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useStorage = (key, initialValue) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedValue = await localforage.getItem(key);
                if (storedValue !== null) {
                    setValue(storedValue);
                }
            } catch (error) {
                toast.error("Error fetching data from localforage");
            }
        };

        fetchData();
    }, [key]);

    const setValueToStorage = async (newValue) => {
        try {
            await localforage.setItem(key, newValue);
            setValue(newValue);
        } catch (error) {
            toast.error("Error setting data to localforage");
        }
    };

    const clearStorage = async () => {
        try {
            await localforage.removeItem(key);
            setValue(initialValue);
        } catch (error) {
            toast.error("Error clearing data from localforage");
        }
    };

    return { value, setValueToStorage, clearStorage };
};

export default useStorage;
