"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MyPageIcon from "@/components/Icons/MyPageIcon";
import EvaluateIcon from "@/components/Icons/EvaluateIcon";
import VerifyIcon from "@/components/Icons/VerifyIcon";
import { useAccount, useDisconnect } from "wagmi";

export const NavigationSidebar = () => {

    const [shortAddress, setShortAddress] = useState("");
    const account = useAccount();
    const { disconnect } = useDisconnect();
    const router = useRouter();

    useEffect(() => {
        if (account.address) {
            const short_address = `${account.address.slice(0, 5)}...${account.address.slice(-3)}`;
            setShortAddress(short_address);
            console.log("short_address:", short_address);
        }
    }, [account.address]);

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

    const handleChangeAccount = () => {
        disconnect();
        router.push("/");
    };

    return (
        <div className="h-full flex flex-col justify-center space-y-10 px-4 sticky top-0 bg-Primary10">
            <div className="absolute top-6 left-6">
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-row space-x-6 items-center">
                        <svg
                            className="h-6 w-6 fill-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 40 40"
                        >
                            <use xlinkHref="/SymbolMark.svg#SymbolMark" />
                        </svg>
                        <span className="text-xs font-semibold text-white">Trusted Score</span>
                    </div>
                    <div className="flex flex-row space-x-6 items-center">
                        <span className="text-xs font-semibold text-white">Logged in as</span>
                        <span className="text-xs font-semibold text-white">{shortAddress}</span>
                    </div>
                    <div className="flex flex-row space-x-6 items-center">
                        <button
                            onClick={handleChangeAccount}
                            className="text-xs font-semibold text-white underline"
                        >
                            Change account
                        </button>
                    </div>
                </div>
            </div>
            {navContents.map((item) => (
                <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex rounded-lg`}
                >
                    <div
                        className={`w-[264px] rounded-md px-2 py-1
                                    bg-white ${pathname === item.href
                                ? "bg-opacity-100"
                                : "bg-opacity-0 group-hover:bg-opacity-8 group-active:bg-opacity-24"
                            } `}
                    >
                        <div className="flex flex-row items-center space-x-2">
                            <div
                                className={`p-2 ${pathname === item.href
                                        ? "[&_path]:fill-Primary10"
                                        : "[&_path]:fill-white"
                                    } `}
                            >
                                {item.icon}
                            </div>
                            <span
                                className={`font-sans font-semibold px-2 ${pathname === item.href ? "text-Primary10" : "text-white"
                                    } `}
                            >
                                {item.name}
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};
