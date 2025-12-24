import { ROUTES } from "@/constants/routes";
import { getAuthToken } from "@/store/local-storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useMainLayout = () => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const authToken = getAuthToken();
        if(!authToken) {
            router.replace(ROUTES.LOGIN.url);
        } else {
            setLoading(false);
        }
    }, []);
    return { isLoading };
}