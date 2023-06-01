import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUsersRequest, fetchCommentsRequest } from "../../../redux/actions";
import routelistPosts from "./routes";
import { User, Comment } from "../../../redux/types";

import "./styles.css"

interface Props {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => void;
  fetchComments: (postId: number) => void;
}

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
  const [comments, setComments] = useState<Comment[]>([]);

  const handleSelectComment = (postId: number) => {
    setSelectedPostId(postId);
    fetchComments(postId);
  };

  useEffect(() => {
    if (selectedPostId !== null) {
      const selectedPost = users.find((user) => user.id === selectedPostId);
      if (selectedPost) {
        setComments(selectedPost.comments);
      }
    }
  }, [selectedPostId, users]);

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
            <h3 className="title">Post: {user.body}</h3>
            <button
              className="button-comment"
              onClick={() => handleSelectComment(user.id)}
            >
              Comment
            </button>
            {selectedPostId === user.id && (
              <>
                {comments && comments.length > 0 ? (
                  <ul>
                    {comments.map((comment) => (
                      <li key={comment.id}>{comment.body}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No comments for this post.</p>
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
