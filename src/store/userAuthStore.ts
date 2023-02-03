import create from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      // initial state
      isLogged: false,
      id: null,
      firstname: null,
      lastname: null,
      avatar: "",
      idFriend: "",
      status: "",

      // methods for manipulating state
      authLogin: (
        status_logged: boolean,
        id: string,
        firstname: string,
        lastname: string,
        avatar: string,
        idFriend: string,
        status: string,
      ) =>
        set((state: any) => ({
          isLogged: status_logged,
          id: id,
          firstname: firstname,
          lastname: lastname,
          avatar: avatar,
          idFriend: idFriend,
          status: status,
        })),
      authUserId: (
        id: string,
      ) =>
        set((state: any) => ({

          id: id
          
        })),
      authIdFriend: (
        idFriend: string,
      ) =>
        set((state: any) => ({

          idFriend: idFriend
          
        })),
      authLogout: () =>
        set((state: any) => ({
          isLogged: false,
          id: null,
          firstname: null,
          lastname: null,
          avatar: null,
          idFriend: "",
          status: "",
        })),
    }),
    {
      name: "userLog", // unique name
      getStorage: () => sessionStorage, // (optional) by default, 'localStorage sessionStorage' is used
    }
  )
);

export default useAuthStore;
