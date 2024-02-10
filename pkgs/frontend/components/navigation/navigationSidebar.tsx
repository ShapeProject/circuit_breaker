"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import MyPageIcon from '@/components/navigation/MyPageIcon'
import EvaluateIcon from '@/components/navigation/EvaluateIcon'
import VerifyIcon from '@/components/navigation/VerifyIcon'

export const NavigationSidebar = () => {
    const pathname = usePathname();

    const navContents = [
        {
            name: "My page",
            href: "/my-page",
            icon: <MyPageIcon />,
        },
        {
            name: "Send an evaluation",
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
        <div className="h-full flex flex-col justify-center space-y-10 px-4 sticky top-0 bg-Primary10">
            {navContents.map((item) => (
                <div
                    key={item.name}
                    className={`group relative flex rounded-lg items-center`}
                >
                    <div className={`w-[264px] rounded-md px-2 py-1
                                    bg-white ${pathname === item.href ? "bg-opacity-100" : "bg-opacity-0 group-hover:bg-opacity-8 group-active:bg-opacity-24"} `}>
                        <div className="flex flex-row items-center space-x-2">
                            <div className={`p-2 ${pathname === item.href ? "[&_path]:fill-Primary10" : "[&_path]:fill-white"} `}>
                                {item.icon}
                            </div>
                            <div>
                                <Link href={item.href} className="group">
                                    <span className={`font-sans font-semibold  px-2 ${pathname === item.href ? "text-Primary10" : "text-white"} `}>{item.name}</span>
                                    {/* クリック範囲を広げる */}
                                    <span className="absolute inset-0 rounded-mdoutline-1 border border-transparent"></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
