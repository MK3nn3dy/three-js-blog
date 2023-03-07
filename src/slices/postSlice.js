import { createSlice } from "@reduxjs/toolkit";

// will eventually be updated by useEffect graphQL call to supabase
const initialState = {
    currentPost: 0,
    posts: [
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
            description: "I don't know what this model will be. This is placeholder data for my third model. My next project will include basic animation, to practice manipulating that with Javascript. I also want to practice having scroll animations so that scenes unfold / animate when a user scrolls / swipes."
        }
    ]
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        nextPost: (state) => {
            if(state.currentPost < state.posts.length - 1){
                state.currentPost ++;
            } else {
                state.currentPost = 0;
            }
        },
        previousPost: (state) => {
            if(state.currentPost > 0){
                state.currentPost--;
            } else {
                state.currentPost = 2;
            }
        }
    }
})

export const { nextPost, previousPost, addThreeScene } = postSlice.actions;

export default postSlice.reducer;