import { supabase } from "./supabaseClient"

export const _getFriendInvite = async(id: any, setData: any) => {
    let { data: frInvites, error: errorRequest } = await supabase
    .from('frInvite')
    .select('askers_list')
    .eq('invite_id', id)
    .single()

    if(frInvites){
      setData(frInvites);
    }
}


export const _getFriendRequest = async(id: any, setData: any) => {
    let { data: frRequests, error: errorRequest } = await supabase
    .from('frRequest')
    .select('friends_list')
    .eq('asker_id', id)
    .single()

    if(frRequests){
      setData(frRequests);
    }
    if(errorRequest){
        console.log(errorRequest)
    }
  }




///Table FriendArea

  export  const _getFriendsFriendArea = async (setData: any, id: any) => {
    let { data: friendArea, error } = await supabase.from("friendArea").select("friends").eq("host_id", id).single();

    if (friendArea) {
      setData(friendArea);
    } else {
      console.log(error);

    }
  };



///Table Users
  export  const _getUserDataExemptMe = async (setUserdata: any, id: any) => {
    let { data: users, error } = await supabase.from("users").select("*, friendArea(*)").neq('id', id);

    if (users) {
      setUserdata(users);
    } else {
      console.log(error);
    }
  };


  export  const _getUserId = async (setUserdata: any) => {
    let { data: users, error } = await supabase.from("users").select("id");

    if (users) {
      setUserdata(users);
    } else {
      console.log(error);
    }
  };


  export  const _getUserDataExemptMe2 = async (setUserdata: any, id: any) => {
    let { data: users, error } = await supabase.from("users").select("*").neq('id', id);

    if (users) {
      setUserdata(users);
    } else {
      console.log(error);
    }
  };