import { useCallback } from "react";

const useScrollToSection = () => {
    const scrollToSection = useCallback((id) => {
        const section = document.getElementById(`tutorial-${id}`);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    return { scrollToSection };
};

export default useScrollToSection; 
