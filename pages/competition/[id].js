/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import Div from "../../components/Div";
import Modal from "../../components/Model";

function Competition({ data }) {
    const palyersRef = useRef()
  const router = useRouter();
  const { id } = router.query;


  const closeModal = (params) => {
    if(palyersRef.current.classList.contains('modalBox'))  {
        palyersRef.current.classList.add('hidden');
    }
  }

  const [playersDetails, setPlayersDetails] = useState();
  const openModal = (e) => {
    // console.log(e)

    let pList = data.response.squads.filter(i => i.team_id === e)
        setPlayersDetails(pList)
    // console.log(playersDetails[0].players)
    if(palyersRef.current.classList.contains('modalBox'))  {
        palyersRef.current.classList.toggle('hidden');
    }
  }
  
  
  return (
    <Div>
      <div>
        {data.response.squads.map((i, key) => {
          return (
            <div key={key}>
              <div className="flex flex-col items-center   my-5  p-3 rounded-xl shadow-[2px_2px_10px_rgba(3,102,214,0.3)]">
                <div className="w-full pb-3 flex justify-center items-center font-bold border-b ">
                  <p className="text-center ">Team : {i.team.title}</p>
                </div>

                

                <div className="flex w-full py-5 flex-row justify-between items-center">
                  <img
                    className="w-28"
                    src={i.team.thumb_url}
                    alt={i.team.title}
                  />
                  <div className=" text-2xl font-semibold">
                  <p>{i.team.abbr}</p>
                </div>
                  <div className="font-bold">
                    <p>Team Id : {i.team.tid}</p>
                    <p>Players In Team : {i.players.length}</p>
                    <p  onClick={()=>openModal(i.team_id)}  className="border text-center text-blue-500 text-xl my-3 py-2 cursor-pointer ">Players</p>
               <Modal data={playersDetails && playersDetails[0].players} palyersRef={palyersRef} closeModal={closeModal}/>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      
      
    </Div>
  );
}

export default Competition;

export const getServerSideProps = async (ctx) => {
  const res = await fetch(
    `https://rest.entitysport.com/v2/competitions/${ctx.query.id}/squads/?token=ec471071441bb2ac538a0ff901abd249`
  );
  const data = await res.json();

  // const matchItems = await fetch(process.env.API_URL + "/api/matches");
  // const data = await matchItems.json();

  return {
    props: { data },
  };
};
