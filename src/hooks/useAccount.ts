import { useState, useEffect } from "react";

import { verifyToken } from "services";

export default function useAccount() {
    const [account, setAccount] = useState<Account | null>(null);
    const [isVerifying, setIsVerifying] = useState<boolean>(true);

    useEffect(() => {
        const localStorageToken = localStorage.getItem("auth-token");
        if (!localStorageToken) return setIsVerifying(false);

        verifyToken(localStorageToken).then(data => {
            if (!data) {
                localStorage.removeItem("auth-token");
            } else {
                localStorage.setItem("auth-token", data.token);

                setAccount(data.account);
            }

            setIsVerifying(false);
        });
    }, []);

    return { account, isVerifying };
}
