import React, { useState, useEffect } from "react";

const AnimatedText = () => {
    const [displayText, setDisplayText] = useState(""); // For showing text gradually
    const [index, setIndex] = useState(0); // Character index
    const [isRemoving, setIsRemoving] = useState(false); // To track removing text
    const [paragraphIndex, setParagraphIndex] = useState(0); // Paragraph index

    const paragraphs = ["This platform will provide you with ...", "front-end", "back-end", "server-side", "and various methodologies", "to help you become a full-stack developer."];


    useEffect(() => {
        const typingSpeed = isRemoving ? 70 : 100; // Speed for typing/removing

        const typeText = setTimeout(() => {
            if (!isRemoving) {
                // Typing effect
                if (index < paragraphs[paragraphIndex].length) {
                    setDisplayText((prev) => prev + paragraphs[paragraphIndex][index]);
                    setIndex(index + 1);
                } else {
                    // Finished typing, start removing after a delay
                    setTimeout(() => setIsRemoving(true), 1000);
                }
            } else {
                // Removing effect
                if (index > 0) {
                    setDisplayText((prev) => prev.slice(0, -1));
                    setIndex(index - 1);
                } else {
                    // Finished removing, move to the next paragraph
                    setIsRemoving(false);
                    setParagraphIndex((prev) => (prev + 1) % paragraphs.length); // Loop paragraphs
                }
            }
        }, typingSpeed);

        return () => clearTimeout(typeText);
    }, [index, isRemoving, paragraphIndex, paragraphs]);

    return (
        <div style={{
            fontWeight: "bold",
            fontSize: '3rem',
            margin : '30px 0 20px 0',
        }}>
            {displayText}
        </div>
    );
};

export default AnimatedText;
