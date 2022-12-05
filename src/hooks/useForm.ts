import { useState } from "react";
import { useRouter } from "next/router";

import { passwordRegex } from "data";

export default function useForm(mode: "login" | "signup"): any {
    const [values, setValues] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const router = useRouter();

    const changeValue = (value: object) => {
        setValues({ ...values, ...value });
    };

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedUsername = values.username.replaceAll(" ", "");

        if (
            !trimmedUsername ||
            !values.password ||
            (mode === "signup" && !values.confirmPassword)
        ) {
            return setError("You must complete all the fields!");
        }

        if (!passwordRegex.test(values.password)) {
            return setError(
                "The password must contain at least 8 characters, 1 number, 1 uppercase letter, 1 lowercase letter, and one symbol!"
            );
        }

        if (mode === "signup" && values.password !== values.confirmPassword) {
            return setError("Given passwords don't match!");
        }

        const request = await fetch(`/api/${mode}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ username: trimmedUsername, password: values.password }),
        });

        const data = await request.json();

        if (request.status !== 200) {
            return setError(data.error);
        }

        localStorage.setItem("auth-token", data.token);
        router.push("/");
    };

    return { values, error, changeValue, handleSubmit };
}
