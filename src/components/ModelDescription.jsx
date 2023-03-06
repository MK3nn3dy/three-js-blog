import { useState } from "react";

const ModelDescription = () => {

    // posts will eventually be taken from redux state using useSelector
    const dummyPosts = [
        {
            title: "City Street",
            description: "This is my first real attempt at an environment in Cinema 4D, though a long time ago I did a little work in Maya and Blender. I follow detailed instructions by MOBOX graphics with slight modifications of my own. This was a great way to learn Cinema 4D'smost popular tools and parametric objects, allowing me to create recognisable objects whilst keeping a low poly-count for three js.\n\nThis was my introduction to the gltf format, and successfully importing this model onto this website is how I locked in the basics of my Cinema 4D to Three JS workflow. It was also where I used to learn dat.gui for lighting, positioning, and debugging."
        },
        {
            title: "Griffin House",
            description: "This was the first time I tried to model something from a reference with no tutorial, deciding for myself which tools to use for which effects. I also learned a lot more about materials and shadows, how they translate to three js, and how they can be manipulated within an imported model."
        },
        {
            title: "Third Model",
            description: "I don't know what this model will be. This is placeholder data for my third model. I think my next project will include basic animation, to practice manipulating that with Javascript."
        }
    ]

    // current model, increased and decreased with onclick of #moveleft and #moveRight
    let [currentModel, setCurrentModel ] = useState(0);


    // functions for move left and right arrows
    const handleMoveLeft = (e) => {

        // only decrease current model index if it's more than 0 index
        if(currentModel > 0){
            setCurrentModel(currentModel-1);
        }

    }

    const handleMoveRight = (e) => {

        // only increase current model index if it's less than the length of the data
        if(currentModel < dummyPosts.length - 1){
            setCurrentModel(currentModel+1);
        }

    }


    return (
        <div className="model-description-panel-container">

            <div className="model-description-panel">

                    <h3 className="model-title"><div id="moveLeft" onClick={handleMoveLeft}></div>{dummyPosts[currentModel].title}<div id="moveRight" onClick={handleMoveRight}></div></h3>

                    <p className="model-description">{dummyPosts[currentModel].description}</p>
                
            </div>

        </div>
    )
}

export default ModelDescription;