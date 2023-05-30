

  export interface RootState {
      users: User[];
 
    }
    
    export interface User {
      id: number;
      body: string;
      title:string;
      loading: boolean;
      error: string | null;



    }
    






