import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPAstes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  //this is used to fetch the data that we recivce  this comes from the redux toolkit as it is the part of this

  const pastes = useSelector((state) => state.paste.pastes);

  //get all paste data from above

  //track all the data from the search
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const filterdata = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPAstes(pasteId));
  }

  return (
    <div>
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5"
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-5">
        {filterdata.length > 0 &&
          filterdata.map((paste) => {
            return (
              <div className="border" key={paste?._id}>

                <div>{paste.title}</div>

                <div>{paste.content}</div>

                <div className="flex flex-row gap-4 place-content-evenly">

                  <button >
                    <a href ={`/?pasteId=${paste?._id}`}>
                      Edit 
                    </a>
                  </button>

                  <button>
                    <a href ={`/pastes/${paste?._id}`}>
                      view
                    </a>
                  </button>

                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("copied to clipboard ");
                    }}
                  >
                    Copy
                  </button>

                  <button>Share</button>

                </div>

                <div>{paste.createdAt}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
