import routelistPosts from "./routes";

// ListPostsPage.tsx

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchUsersRequest,
  fetchCommentsRequest,
} from "../../../redux/actions";

import { User, Comment } from "../../../redux/types";

import "./styles.css";

interface Props {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => void;
  fetchComments: (postId: number) => void;
}

// ListPostsPage.tsx

// ... импорт и другой код ...

const ListPostsPage = ({
  users,
  loading,
  error,
  fetchUsers,
  fetchComments,
}: Props) => {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [commentsVisible, setCommentsVisible] = useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  const handleSelectComment = (postId: number) => {
    if (selectedPostId === postId) {
      setSelectedPostId(null);
      setCommentsVisible(false);
    } else {
      setSelectedPostId(postId);
      setCommentsVisible(true);
      if (!initialLoad) {
        fetchComments(postId);
      } else {
        setInitialLoad(false);
      }
    }
  };

  const getCommentsForPost = (postId: number) => {
    const selectedUser = users.find((user) => user.id === postId);
    if (selectedUser) {
      return selectedUser.comments;
    }
    return [];
  };

  const comments = selectedPostId ? getCommentsForPost(selectedPostId) : [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!users || users.length === 0) {
    return <div>No users found.</div>;
  }

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h2 className="title">Title: {user.title}</h2>
            <h3 className="body">Post: {user.body}</h3>
            <button
              className="button-comment"
              onClick={() => handleSelectComment(user.id)}
            >
              Comment
            </button>
            {selectedPostId === user.id && commentsVisible && (
              <>
                {comments && comments.length > 0 ? (
                  <ul>
                    {comments.map((comment) => (
                      <li key={comment.id}>
                        Email: {comment.email}
                        <br />
                        Comment: {comment.body}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-comments">No comments for this post.</p>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  users: state.users && state.users.users ? state.users.users : [],
  loading: state.users && state.users.loading,
  error: state.users && state.users.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: () => dispatch(fetchUsersRequest()),
  fetchComments: (postId: number) => dispatch(fetchCommentsRequest(postId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListPostsPage);

export { routelistPosts };
