
const ExampleList: React.FC<{ list: string[]}>= (props) => {
  
    return (
        <ul className='list-none w-10/12 my-7 mx-auto p-0 max-w-12/12'>
          {props.list.map((item: string) => (
            <li className='my-4 mx-0 bg-gray-100 rounded p-3 shadow' key={Math.random()}><div className='pl-4'>{item}</div></li>
          ))}
        </ul>
      );
    
  };
  
  export default ExampleList;