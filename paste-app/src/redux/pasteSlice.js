import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    pastes: localStorage.getItem("pastes")
        ? JSON.parse(localStorage.getItem("pastes"))
        : [], // Default to an empty array if nothing is stored
};

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {

    addToPastes:(state , action) =>
    {
        const paste = action.payload;

        // Push the new paste to the state
        state.pastes.push(paste);
    
        // Save the updated pastes array to localStorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
    
        toast("Paste created successfully");//this is for  showing the dialouge box to after the task is completed like a message that displays 

    },
    updateToPastes :(state,action) =>
    {
        const paste = action.payload
      const index = state.pastes.findIndex((item) => item._id === paste._id)

      if (index >= 0) {
        // If the course is found in the Pastes, update it
        state.pastes[index] = paste
        // Update to localstorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        // show toast
        toast.success("Paste updated")
      }

    },
    restAllPastes :(state,action) =>
    {
        state.pastes = []
        // Update to localstorage
        localStorage.removeItem("pastes")

    },
    removeFromPAstes :(state,action) =>
    {
        const pasteId = action.payload;

        console.log(pasteId);
        const index = state.pastes.findIndex((item)=>item._id === pasteId);

        if(index >= 0)
        {
            state.pastes.splice(index,1);
            localStorage.setItem("pastes",JSON.stringify(state.pastes));

            toast.success("paste deleted");
        }

    },
   
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes,updateToPastes, restAllPastes, removeFromPAstes } = pasteSlice.actions

export default pasteSlice.reducer