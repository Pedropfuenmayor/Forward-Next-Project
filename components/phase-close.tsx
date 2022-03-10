

const PhaseClose: React.FC<{
  text: string;
}> = ({text}) => {
  

  return (
    <section className="m-auto w-11/12">
          <h1 className='mt-10 text-center text-3xl text-black sm:text-6xl'>
             {text}
             <span className="text-blue-600">!</span>
          </h1>
     
    </section>
  );
};

export default PhaseClose;