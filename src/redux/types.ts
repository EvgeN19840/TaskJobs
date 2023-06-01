

  export interface RootState {
      users: User[];
 
    }
    export interface User {
  id: number;
  body: string;
  title: string;
  loading: boolean;
  error: string | null;
  comments: Comment[]; 
  name: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;

}





