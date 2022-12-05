import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useAccount, useForm } from "hooks";
import { FormField, Button } from "components";

export default function Login() {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const router = useRouter();
    const { account, isVerifying } = useAccount();
    const { values, error, changeValue, handleSubmit } = useForm(mode);

    useEffect(() => {
        if (isVerifying) return;

        if (account) {
            router.push("/");
        }
    }, [isVerifying, account, router]);

    return (
        !isVerifying && (
            <div className="flex min-h-screen flex-col items-center justify-center gap-8">
                <h1 className="text-4xl font-black text-indigo-600">
                    {mode === "login" ? "Log In" : "Sign Up"}
                </h1>

                <form
                    className="flex w-[85%] flex-col gap-6 rounded-sm bg-zinc-200 px-6 py-8 sm:w-3/4 md:w-3/5 md:p-8 lg:w-1/2 xl:w-2/5 2xl:w-1/3"
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    {error && (
                        <p className="rounded-sm bg-red-500 p-3 text-center text-sm font-medium text-white">
                            {error}
                        </p>
                    )}

                    <FormField
                        id="username"
                        label="Username"
                        type="text"
                        placeholder="Your username"
                        value={values.username}
                        changeValue={changeValue}
                    />
                    <FormField
                        id="password"
                        label="Password"
                        type="password"
                        placeholder="Your password"
                        value={values.password}
                        changeValue={changeValue}
                    />

                    {mode === "signup" && (
                        <FormField
                            id="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            placeholder="Confirm your password"
                            value={values.confirmPassword}
                            changeValue={changeValue}
                        />
                    )}

                    <div>
                        <Button>{mode === "login" ? "Log In" : "Sign Up"}</Button>

                        <small className="ml-0.5 text-xs font-medium text-neutral-700">
                            {mode === "login"
                                ? "You don't have an account?"
                                : "Already have an account?"}
                            &nbsp;
                            <button
                                type="button"
                                className="text-indigo-500 underline"
                                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                            >
                                {mode === "login" ? "Sign Up" : "Log In"}
                            </button>
                        </small>
                    </div>
                </form>
            </div>
        )
    );
}
