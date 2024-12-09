import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes } from "../redux/pasteSlice";
import {updateToPastes} from "../redux/pasteSlice";
import { useEffect } from "react";


const Home = () => {
  const [title, setTitle] = useState("");

  // Functionality to implement paste functionality
  // we need to update if only we get paste id
  // so to do this we need to transfer that ie when no paste id only create inside the home
  // if paste id the work on paste

  // this is for the contet

  const [value, setValue] = useState("");

  // this is to search the id if we get the id we will pass it else we wont

  const [searchParams, setSearchParams] = useSearchParams();

  // this is to find which param we need
  const pasteId = searchParams.get("pasteId");

  //to use the reducer function we need this dispatcher function 

  const dispatch = useDispatch();

  // for the first time if paste is created or we are .updating it this is wrok in both cases 
  //as we take pasteID while updating and take the date while creating the new one 

  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {

    if(pasteId) {
      const paste = allPastes.find((p) =>p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
      
    }

    
  }, [pasteId])

  function createPaste()
  {

    const paste ={
        title : title ,
        content : value ,
        _id : pasteId || Date.now().toString(36),
        createdAt : new Date().toISOString(),
    }


    

    if(pasteId ){
        //update the paste 
        dispatch(updateToPastes(paste));

    }
    else 
    {
        //create 

        dispatch(addToPastes(paste));
    }

    //after creation and updation we will do cleaning
    //so that every thing is new and empty 

    setTitle('');
    setValue('');
    setSearchParams('');
    


  }

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-1 rounded-2xl mt-2 w-[66%] pl-4"
          type="text"
          placeholder="enter title here "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="p-2 rounded-2xl mt-2"
        onClick={createPaste}>
            
          {pasteId ? "updatePaste" : "Create My Paste"}
        </button>
      </div>

      <div className="mt-8">
        <textarea className="rounded-2xl mt-4, min-w-[500px] p-4"
            value = {value}
            placeholder="enter content "
            onChange={(e)=>setValue(e.target.value)}
            rows={20}

        />

      </div>
    </div>
  );
};

export default Home;
