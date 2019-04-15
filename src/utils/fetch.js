const BASE='/';

async function fetchJson(url, options){
  try{
    let res=await fetch(BASE+url, options);
    let {ok, err, data}=await res.json();

    if(!ok){
      console.error(err);

      throw err;
    }else{
      return data;
    }
  }catch(e){
    console.error(e);
    throw e;
  }
}

export default fetchJson;
