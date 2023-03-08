import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const PlanetSlider = () => {

    const slider = useRef(null);
    const currentPost = useSelector((state) => state.posts.currentPost);

    useEffect(() => {

        slider.current.style.display = currentPost == 1 ? "block" : "none";

    }, [currentPost])

    return (
        <div ref={slider} className="slider-component">
            <div id="slider-container"></div>
            <div className="slide-to-animate">slide to animate!</div>
        </div>
    )

}

export default PlanetSlider;