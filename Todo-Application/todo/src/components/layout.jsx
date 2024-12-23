/* eslint-disable react/prop-types */

import Logo from "./Logo";
import MobileNavbar from "./navabr/MobileNavbar";
import SidebarMain from "./navabr/SidebarMain";
import SidebarMobile from "./navabr/SidebarMobile";

const Layout = ({ children }) => {
    return (
        <>
            <div>
                <SidebarMobile />

                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
                        <Logo />
                        <SidebarMain />
                    </div>
                </div>

                {/* navbar */}
                <MobileNavbar />

                {/* navbar end */}

                {children}
            </div>
        </>
    );
};

export default Layout;
