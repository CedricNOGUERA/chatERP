import { supabase } from "./supabaseClient";

export const _getDateLocal = (dateToFormat: any) => {
    let date = new Date(dateToFormat);
    return date.toLocaleString("fr-FR", { timeZone: "Pacific/Tahiti" });
  };



export const _updateUserStatus = async (id: any, status: any, badge: any) => {
  const { data, error } = await supabase
    .from("users")
    .update({ status: status, badge_status: badge })
    .eq("id", id);

  if(!error){
    console.log('Status modifié')
  }


  }




  
  
  
  
  export  const _getUserData = async (setUserdata: any) => {
    let { data: users, error } = await supabase.from("users").select("*, friendArea(*)");
    
    if (users) {
      setUserdata(users);
    } else {
      console.log(error);
    }
  };


  export  const _getChatId = async (setdata: any) => {
    let { data, error } = await supabase.from("chatMessages2").select("id").order('id', { ascending: false });
    
    if (data) {
      setdata(data[0].id + 1);
    } else {
      setdata(1);
      console.log(error);
    }
  };

  export  const _getChatData = async (setdata: any, id: any) => {
    let { data, error } = await supabase.from("chatMessages2").select("*").eq('user_id', id)
    .eq('status', 'pending');
    
    if (data) {
      setdata(data);
    } else {
      console.log(error);
    }
  };
  export  const _updateChatStatus = async (id: any) => {
    let { data, error } = await supabase.from("chatMessages2").update({status: "accept"}).eq('id', id);
    
    if (!error) {
      console.log("good")
  
    }
    if (error) {
  
      console.log(error);
    }
  };


  export  const _getUserDataOnlyMe = async (setdata: any, id: any) => {
    let { data: users, error } = await supabase.from("users").select("*, friendArea(*)").eq('id', id).single();

    if (users) {
      setdata(users);
    } else {
      console.log(error);
    }
  };
  

  export  const _getInvitedUserData = async (setdata: any, id: any) => {
    let { data: users, error } = await supabase.from("users").select("*, friendArea(*)").eq('id', id);

    if (users) {
      setdata(users);
    } else {
      console.log(error);
    }
  };

  export  const _getUserDataExemptMe = async (setUserdata: any, id: any) => {
    let { data: users, error } = await supabase.from("users").select("*, friendArea(*)").neq('id', id);

    if (users) {
      setUserdata(users);
    } else {
      console.log(error);
    }
  };


  export  const _getAllFriendAreaData = async (setData: any) => {
    let { data: friendArea, error } = await supabase.from("friendArea").select("*");

    if (friendArea) {
      setData(friendArea);
    } else {
      console.log(error);
    }
  };

  export  const _getFriendArea = async (setData: any, id: any) => {
    let { data: friendArea, error } = await supabase.from("friendArea").select("*").eq("host_id", id).single();

    if (friendArea) {
      setData(friendArea);
    } else {
      console.log(error);
      setData(false)

    }
  };