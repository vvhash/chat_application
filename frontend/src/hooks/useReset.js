import { useState } from 'react';
import toast from 'react-hot-toast';

const useReset = (setEmailSent) => {
    const [loading, setLoading] = useState(false);

    const reset = async ({ username }) => {
        const success = handleInputErrors({ username });
        if (!success) return;

        setLoading(true);

        try {
            const res = await fetch("/api/auth/reset", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username }),
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                // Assuming 'res.ok' means status 200-299
                toast.success(data.message || "Reset email sent successfully!");
                setEmailSent(true);  // Set emailSent to true on success
            } else {
                // Handle non-200 responses
                toast.error(data.error || "An error occurred during the reset process.");
            }

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, reset };
};

export default useReset;

function handleInputErrors({ username }) {
    if (!username) {
        toast.error("Please fill in all fields");
        return false;
    }
    return true;
}
