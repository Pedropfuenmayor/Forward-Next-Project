

const PhaseClose: React.FC<{
  text: string;
}> = ({text}) => {
  

  return (
    <section className="flex flex-col justify-center items-center">
        <div className="flex items-center">
          <h1 className='mt-10 text-center text-6xl text-black max-w-xl'>
             {text}
             <span className="text-blue-600">!</span>
          </h1>
          <span className="pl-5 text-5xl">🚀</span>
        </div>
     
    </section>
  );
};

export default PhaseClose;