export const fetcher = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
  
    if (res.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  };

  export function uid (){
    return Math.floor(Math.random() * (1000000000 -1) + 1);
      }