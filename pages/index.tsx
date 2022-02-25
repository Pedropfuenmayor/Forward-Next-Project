import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'


const Home: NextPage = () => {
  return (
    <section className="bg-white">
    <div className="container px-6 py-16 mx-auto">
        <div className="w-9/12 mx-auto mt-16">
            <h1 className="text-4xl font-bold text-left text-gray-800 w-auto md:text-5xl" >Brainstorm, find new ideas, solve problems... fast.</h1>
            <p className="mt-6 text-gray-800 text-lg leading-8 :leading-10 md:text-xl">Our goal is to provide a clean approach to the processes of idea generation. Minimal contextual distraction, maximal output. Identify problems, generate solution and prioritaze on what matter to your project. </p>
            <Link href={`${process.env.URI}/login`}>
            <a>
            <button
                className="px-6 py-2 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg hover:bg-blue-500 md:mx-0 md:w-auto focus:outline-none">
                Start
            </button>
            </a>
            </Link>
        </div>
    </div>
</section>
  )
}

export default Home
