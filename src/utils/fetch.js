import { Toast } from 'antd-mobile';
const BASE='/';

async function fetchJson(url, options){
  Toast.loading('Loading...', 1, () => {
    console.log('Load complete !!!');
  });
  try{
    let res=await fetch(BASE+url, options);
    let {ok, err, data}=await res.json();

    if(!ok){
      console.error(err);

      throw err;
    }else{
      Toast.hide()
      return data;
    }
  }catch(e){
    console.error(e);
    throw e;
  }
}

export default fetchJson;
