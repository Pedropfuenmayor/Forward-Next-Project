import { NextPage } from "next"
import {
    LightningBoltIcon,
    LightBulbIcon,
    PencilIcon,
    ClipboardListIcon
  } from "@heroicons/react/outline";

const Features:NextPage  = () => {
    return (
<section className="bg-white -mt-20">
            <div className="container px-6 py-10 mx-auto">
                <h1 className="text-3xl font-semibold text-center text-gray-800 lg:text-4xl">Enjoy a powerful <span className="text-blue-500">Framework</span></h1>
                
                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-2 ">
                    <div className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl">
                        <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full">
                            <div className='w-6 h-6'>
                            <LightningBoltIcon />
                            </div>
                        </span>

                        <h1 className="text-2xl font-semibold text-gray-700 capitalize">Stay focus</h1>

                        <p className="text-gray-500 ">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet
                        </p>

                    </div>

                    <div className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl ">
                        <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full ">
                        <div className='w-6 h-6'>
                            <LightBulbIcon />
                            </div>
                        </span>

                        <h1 className="text-2xl font-semibold text-gray-700 capitalize ">Generate Ideas</h1>

                        <p className="text-gray-500 ">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet
                        </p>

                    </div>

                    <div className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl ">
                        <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full ">
                        <div className='w-6 h-6'>
                            <ClipboardListIcon />
                            </div>
                        </span>

                        <h1 className="text-2xl font-semibold text-gray-700 capitalize ">Prioritize</h1>

                        <p className="text-gray-500 ">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet
                        </p>

                    </div>

                    <div className="flex flex-col items-center p-6 space-y-3 text-center bg-gray-100 rounded-xl ">
                        <span className="inline-block p-3 text-blue-500 bg-blue-100 rounded-full ">
                        <div className='w-6 h-6'>
                            <PencilIcon />
                            </div>
                        </span>

                        <h1 className="text-2xl font-semibold text-gray-700 capitalize ">Learn by Doing</h1>

                        <p className="text-gray-500 ">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet
                        </p>

                    </div>
                </div>
            </div>
        </section>
        
    )} 

    export default Features;