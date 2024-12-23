const formatDate = (date) => {
    const formatedDate = new Intl.DateTimeFormat("en-US").format(date.toDate());
    return formatedDate;
};

export { formatDate };
