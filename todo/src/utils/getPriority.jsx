const pickPriority = (value) => {
    switch (value) {
        case "medium":
            return <div className="bg-tarquoise w-3 h-3 rounded-full"></div>;

        case "low":
            return <div className="bg-gold w-3 h-3 rounded-full"></div>;
        default:
            return <div className="bg-rose w-3 h-3 rounded-full"></div>;
    }
};

export { pickPriority };
