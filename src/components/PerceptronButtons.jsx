import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const PerceptronButtons = () => {

    const buttonPanel = useRef(null);
    const currentPost = useSelector((state) => state.posts.currentPost);

    useEffect(() => {
        // only display perceptron controls if viewing perceptron
        buttonPanel.current.style.display = currentPost == 2 ? "grid" : "none";

    }, [currentPost]);


    return (
        <div id="pButtonsContainer"ref={buttonPanel}>
            <select id="pButtonsPanel">
                
            </select>
            <div className="perceptronLearnMore">learn more!</div>
        </div>
    )

}

export default PerceptronButtons;