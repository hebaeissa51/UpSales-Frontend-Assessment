import { useRef } from "react";
import { Toast } from "primereact/toast";
import { FullScreenBtn } from "../components/buttons/FullScreenBtn";
import moment from "moment";
import AccountMenu from "../components/menus/AccountMenu";

export const Header = () => {
    const toast = useRef(null);

    return (
        <>
            <Toast ref={toast} />
            <header className="flex items-center justify-between px-5 bg-white h-[70px] w-full fixed top-0 left-0 right-0 z-50">
                <div className="flex items-center">
                    <figcaption className="flex items-center">
                        <h3 className="text-[20px] font-medium">Favorite Movies & TV Shows</h3>
                    </figcaption>
                </div>
                <div className="flex items-center">
                    <p className="hidden sm:block mx-6">
                        <i className="far fa-clock text-[16px] text-primary mr-1"></i>
                        <span className="text-[14px] text-[#444746]">{moment().locale("en").format('h:mm A')}</span>
                    </p>
                    <FullScreenBtn />
                    <AccountMenu />
                </div>
            </header >
        </>
    )
}