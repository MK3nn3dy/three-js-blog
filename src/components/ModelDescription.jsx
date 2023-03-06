import { useSelector, useDispatch } from "react-redux";
import { nextPost, previousPost } from '../slices/postSlice.js';

const ModelDescription = () => {

    // state dispatch function
    const dispatch = useDispatch();

    // state posts
    const currentPost = useSelector((state) => state.posts.currentPost);
    const statePosts = useSelector((state) => state.posts.posts);

    // functions for move left and right arrows
    const handleMoveLeft = (e) => {

        dispatch(previousPost());

    }

    const handleMoveRight = (e) => {

        dispatch(nextPost());

    }


    return (
        <div className="model-description-panel-container">

            <div className="model-description-panel">

                    <h3 className="model-title"><div id="moveLeft" onClick={handleMoveLeft}></div>{statePosts[currentPost].title}<div id="moveRight" onClick={handleMoveRight}></div></h3>

                    <p className="model-description">{statePosts[currentPost].description}</p>
                
            </div>

        </div>
    )
}

export default ModelDescription;