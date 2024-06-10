import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const [mfaCode, setMfaCode] = useState(""); // State to store MFA code
	const { setAuthUser } = useAuthContext();
	// Add inside useLogin hook
	const [showPopup, setShowPopup] = useState(false);

	const login = async (username, password) => {
		const success = handleInputErrors(username, password);
        if (!success) return;
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user", JSON.stringify(data)); // Store user data in local storage
			setMfaCode(data.mfaCode);
			//console.log("Received MFA Code:", data.mfaCode); // Log to check the MFA code
            setShowPopup(true); // Show the popup on successful login

            // Don't set the auth context here, wait for popup to be dismissed
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        const storedUser = JSON.parse(localStorage.getItem("chat-user"));
        setAuthUser(storedUser); // Set auth context after popup is dismissed
    };

    return { loading, login, showPopup, handlePopupClose, mfaCode };
};
export default useLogin;

function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}