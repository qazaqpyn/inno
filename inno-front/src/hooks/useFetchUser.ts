import { useEffect } from "react";
import { useUser } from "../context/Context";
import { User } from "../types";

interface IUseFetchUserReturn {
    loading: boolean;
    error: Error | null;
    user: User | null;
}

const useFetchUser = (): IUseFetchUserReturn => {
    const { state, fetchUser } = useUser();
    const { user, loading, error } = state;

    useEffect(() => {
        fetchUser();
    }, []);

    return { loading, error, user };
};

export default useFetchUser;


