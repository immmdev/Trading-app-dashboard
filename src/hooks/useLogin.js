import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate=useNavigate();

    const login = async (username, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('https://trading-app-wilt.onrender.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username,password })
            });

            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setError(json.error || "Signup failed");
                return;
            }

            // Save the user to local storage
            localStorage.setItem("user", JSON.stringify(json));
             navigate("/");
            // Update the auth context
            dispatch({ type: "LOGIN", payload: json });

            setIsLoading(false);
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
