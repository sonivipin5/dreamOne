/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { deleteCookie, getCookie } from 'cookies-next'

import { FaBell } from "react-icons/fa";
import Div from "../components/Div";
import { useRouter } from "next/router";

const Home = ({ matches, data }) => {
const router = useRouter()
const [token, setToken] = useState('as')



useEffect(() => {
  setToken(getCookie('token'))
  if (token === undefined) {
    router.push('/login')
    return
  }

}, [token])


  return (
    <Div>
      <h1 className="font-bold m-10">Upcoming Matches</h1>

      <div className="m-auto w-[90%]   ">
        <div >
          {matches.response.items.map((i, key) => {
            return <Link key={key} href={`/competition/${i.competition.cid} `}>
              <div  className="my-5 cursor-pointer bg-gray-50 rounded-xl shadow-[2px_2px_10px_rgba(3,102,214,0.3)] ">

            <div className="flex justify-between items-center  p-3 border-b ">
                <p>{i.format_str}</p>
                <p>{i.title}</p>
                <FaBell className="inline" />
              </div>
              <div className="flex justify-between mx-5 py-3">
                <p>{i.teama.name}</p>
                <p>{i.teamb.name}</p>
              </div>
              <div className="flex justify-between items-center mx-5 py-3 pb-5">
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center">
                    <img className="mx-4 w-20" src={i.teama.logo_url} alt={i.teama.short_name} />
                    <p>{i.teama.short_name}</p>
                  </div>
                  {/* <p>Scores :{i.teama.scores}</p> */}

                </div>


                <p>{i.date_start_ist.split(' ')[0].split('-').reverse().join('/')}</p>


                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center">
                    <p>{i.teamb.short_name}</p>
                    <img className="mx-4 w-20" src={i.teamb.logo_url} alt={i.teama.short_name} />
                  </div>
                  {/* <p>Scores :{i.teamb.scores}</p> */}
                </div>
              </div>
            </div></Link>
              ;
          })}
        </div>
      </div>
    </Div>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch(
    "https://rest.entitysport.com/v2/matches/?status=2&token=ec471071441bb2ac538a0ff901abd249&per_page=10&&paged=1"
  );
  const matches = await res.json();

  const matchItems = await fetch(process.env.API_URL + "/api/matches");
  const data = await matchItems.json();

  return {
    props: { matches, data },
  };
};

export default Home;
