import { getCookie } from "cookies-next";
import { createContext, useContext, useEffect, useState } from "react";

export const ContextApi = createContext();

const DataProvider = ({ children }) => {
  const [token, setToken] = useState(getCookie("token"));

  const [data, setData] = useState();
  const [note, setNote] = useState({
    title: "",
    desc: "",
    tag: "",
  });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };


  const submitNOte = async (e) => {
    e.preventDefault();
   
    const res = await fetch(`/api/createnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: note.title, desc: note.desc, tag:note.tag }),
    });
  };

  const getNotes = async () => {
    const res = await fetch(`/api/getnote`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    
    

      if(!data || data.length <  json.length){
        setData(json)
      }
   
    
  };

  return (
    <ContextApi.Provider
      value={{ token, data, getNotes, submitNOte, onChange, note }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export default DataProvider;
