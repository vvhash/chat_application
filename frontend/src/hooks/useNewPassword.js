import { useState } from 'react';
import toast from 'react-hot-toast';

const useNewPassword = () => {
    const [loading, setLoading] = useState(false);

    const resetPassword = async ({ key, newPassword, confirmPassword }) => {
        
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return false;
        }

        const success = handleInputErrors({ key, newPassword});
        if (!success) return false;

        setLoading(true);

        try {
            const res = await fetch("/api/auth/newpassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key, newPassword }),
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                // Assuming 'res.ok' means status 200-299
                toast.success(data.message || "Password reset successfully!");
                return true;
            } else {
                // Handle non-200 responses
                toast.error(data.error || "An error occurred during the reset process.");
                return false;
            }

        } catch (error) {
            toast.error(error.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loading, resetPassword };
};

export default useNewPassword;
function handleInputErrors({ key, newPassword }) {
    if (!key) {
        toast.error("Please fill in the key");
        return false;
    }
    if (!newPassword) {
        toast.error("Please fill in the new password");
        return false;
    }

    return true;
}