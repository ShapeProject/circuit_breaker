"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MyPageIcon from "@/components/Icons/MyPageIcon";
import EvaluateIcon from "@/components/Icons/EvaluateIcon";
import VerifyIcon from "@/components/Icons/VerifyIcon";
import { Logomark } from "../logomark";

export const NavigationSidebar = () => {

    const pathname = usePathname();
    const navContents = [
        {
            name: "My page",
            href: "/my-page",
            icon: <MyPageIcon />,
        },
        {
            name: "Evaluation",
            href: "/evaluate",
            icon: <EvaluateIcon />,
        },
        {
            name: "Verification",
            href: "/verify",
            icon: <VerifyIcon />,
        },
    ];

    return (
        <div className="h-full w-[25%] max-w-[296px] md:max-w-none flex flex-col justify-center px-4 py-4 sticky top-0 bg-Primary10
        md:h-fit md:w-full md:flex-row">
            <div className="absolute top-4 left-4 md:hidden">
                <Logomark color={"white"} />
            </div>
            {navContents.map((item) => (
                <Link className={`group w-full my-5 flex rounded-lg lg:rounded md:my-0 md:mx-5 md:justify-center md:w-[111px]`}
                    key={item.name}
                    href={item.href}>
                    <div
                        className={`w-full rounded-md px-2 py-1 bg-white lg:rounded lg:px-1 lg:py-0 sm:py-1
                        ${pathname === item.href
                                ? "bg-opacity-100 md:bg-opacity-0"
                                : "bg-opacity-0 group-hover:bg-opacity-8 group-active:bg-opacity-24"
                            } `}
                    >
                        <div className="flex flex-row items-center space-x-2 md:flex-col md:space-y-4">
                            <div className={`p-2 md:p-1.5 rounded ${pathname === item.href ? "[&_path]:fill-Primary10 md:bg-white" : "[&_path]:fill-white"} `}>
                                {item.icon}
                            </div>
                            <span className={`font-sans px-2 ${pathname === item.href ? "text-Primary10 font-semibold md:text-white" : "text-white font-medium"} `}>
                                {item.name}
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};
