import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (name, username, email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('https://trading-app-wilt.onrender.com/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, username, email, password })
            });

            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setError(json.error || "Signup failed");
                return;
            }

            // Save the user to local storage
            localStorage.setItem("user", JSON.stringify(json));

            // Update the auth context
            dispatch({ type: "LOGIN", payload: json });

            setIsLoading(false);
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setIsLoading(false);
        }
    };

    return { signup, isLoading, error };
};
