import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAccount } from "hooks";
import { Button } from "components";

export default function Index() {
    const { account, isVerifying } = useAccount();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("auth-token");
        router.push("/login");
    };

    useEffect(() => {
        if (isVerifying) return;

        if (!account) {
            router.push("/login");
        }
    }, [isVerifying, account, router]);

    return (
        account && (
            <div className="flex min-h-screen flex-col items-center justify-center gap-16">
                <h1 className="text-center text-3xl font-black text-indigo-600">
                    NextJS Simple Login
                </h1>

                <div className="flex flex-col items-center gap-6">
                    <h2 className="text-center text-xl font-black text-indigo-600 [line-height:1]">
                        Your data
                    </h2>

                    <main className="rounded-sm bg-zinc-200 p-4 md:p-8">
                        {Object.keys(account).map(key => (
                            <p key={key} className="text-lg font-bold text-neutral-700">
                                {key}:&nbsp;
                                <span className="text-indigo-500">
                                    {account[key as keyof Account]?.toString()}
                                </span>
                            </p>
                        ))}
                    </main>

                    <Button onClick={handleLogout}>Log Out</Button>
                </div>
            </div>
        )
    );
}
