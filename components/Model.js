import React from 'react'
import { AiOutlineCloseSquare, FaBeer } from 'react-icons/ai';
import { BiPlusCircle } from 'react-icons/bi';


const Modal = ({ palyersRef, closeModal, data }) => {
    return (
        <div ref={palyersRef} className="modalBox transition-all hidden z-[20] fixed top-0 left-0 bg-[#1D1D1D]  min-w-[475px] w-full h-full">
            <div className="transition-all w-full h-full flex justify-center items-center ">
                <div className=" transition-all bg-white w-[90%] h-[90%] m-10 flex justify-center items-center">
                    <span
                        onClick={closeModal}
                        className="fixed top-3 right-3 text-3xl cursor-pointer text-white"
                    >
                        <AiOutlineCloseSquare />
                    </span>
                    {/* <iframe className="w-full h-full transition-all" src='https://my-strapi-blog.netlify.app/' /> */}
                    <div className="w-full h-[100%] overflow-y-scroll">
                        <p className='text-center text-xl'>Team Players List</p>
                        {data && data.map((i, key) => {
                            return <div key={key} className="w-[90%] m-auto my-5 p-8 rounded-xl shadow-[2px_2px_10px_rgba(3,102,214,0.3)]">
                                <div className='flex justify-between '>
                                    <div className="space-y-3">
                                    <p> Player Id : <span className='font-normal'>{i.pid}</span></p>
                                    <p> Player Name : <span className='font-normal'>{i.title}</span></p>
                                    <p> DOB : <span className='font-normal'>{i.birthdate.split('-').reverse().join('/')}</span></p>
                                    <p> Playing Role : <span className='font-normal'>{i.playing_role}</span></p>
                                    <p> Batting Style : <span className='font-normal'>{i.batting_style}</span></p>
                                    <p> Bowling Style : <span className='font-normal'>{i.bowling_style}</span></p>
                                    <p> Nationalty : <span className='font-normal'>{i.nationality}</span></p>
                                    <p> Recent match : <span className='font-normal'>{i.recent_match}</span></p>
                                    <p> Recent appearance : <span className='font-normal'>{i.recent_appearance}</span></p>
                                    <p> Fantasy player rating : <span className='font-normal'>{i.fantasy_player_rating}</span></p>
                                    </div>
                                    <BiPlusCircle className='inline text-3xl cursor-pointer'/>
                                </div>
                            </div>
                        })}

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Modal
