import { useSelector, useDispatch } from "react-redux";
import { nextPost, previousPost } from '../slices/postSlice.js';
import { useRef, useState } from "react";

const ModelDescription = () => {

    // state dispatch function
    const dispatch = useDispatch();

    // state posts
    const currentPost = useSelector((state) => state.posts.currentPost);
    const statePosts = useSelector((state) => state.posts.posts);

    // container useRef
    const descriptionContainer = useRef(null);

    // local state for description visibility
    const [ visible, setVisible ] = useState(true);

    // functions for move left and right arrows
    const handleMoveLeft = (e) => {
        dispatch(previousPost());
    }

    const handleMoveRight = (e) => {
        dispatch(nextPost());
    }

    const handleShowHide = (e) => {
        setVisible(!visible);
        descriptionContainer.current.classList.remove(visible ? "description-showing" : "description-hidden");
        descriptionContainer.current.classList.add(visible ? "description-hidden" : "description-showing");
    }


    return (
        <div ref={descriptionContainer} className="model-description-panel-container description-showing">

            <div className="model-description-panel">

                    <div className="hide-show-description" onClick={handleShowHide}>{ visible ? "hide" : "show" }</div>

                    <h3 className="model-title"><div id="moveLeft" onClick={handleMoveLeft}></div>{statePosts[currentPost].title}<div id="moveRight" onClick={handleMoveRight}></div></h3>

                    <p className="model-description">{statePosts[currentPost].description}</p>
                
            </div>

        </div>
    )
}

export default ModelDescription;