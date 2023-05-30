import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsersRequest } from "../../../redux/actions";
import routelistPosts from "./routes";
import { RootState, User } from "../../../redux/types";

interface Props {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => void;
}

const ListPostsPage = ({ users, loading, error, fetchUsers }: Props) => {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
const hendelSelectComent=()=>{
console.log()
}
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
          <h2 className="title"> Title{user.title}</h2> 
          <h3 className="title"> Post {user.body}</h3 > 
          <button className="button-coment" onClick={hendelSelectComent}>comment</button>
          </li>
         
        ))}
   
      </ul>
   
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  users: state.users.users,
  loading: state.users.loading,
  error: state.users.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: () => dispatch(fetchUsersRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListPostsPage);

export { routelistPosts };

