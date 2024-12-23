import useStore from "../../state/store";

const MobileNavbar = () => {
    const { setIsOpen } = useStore();
    return (
        <>
            <div className="fixed w-full top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                <button
                    type="button"
                    className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                    onClick={() => setIsOpen(true)}
                >
                    <span className="sr-only">Open sidebar</span>
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </button>
                <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
                    Simple Todo
                </div>
            </div>
            ;
        </>
    );
};

export default MobileNavbar;
