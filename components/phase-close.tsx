

const PhaseClose: React.FC<{
  text: string;
}> = ({text}) => {
  

  return (
    <section className="flex flex-col justify-center items-center">
        <div className="flex items-center">
          <h1 className='mt-10 text-center text-3xl text-black max-w-xl sm:text-6xl'>
             {text}
             <span className="text-blue-600">!</span>
          </h1>
          {/* <span className="pl-2 text-lg sm:text-5xl ">🚀</span> */}
        </div>
     
    </section>
  );
};

export default PhaseClose;