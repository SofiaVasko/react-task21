import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import checkmark from "./img/check.png";
import comment from "./img/comment.png";
import like from "./img/like.png";
import uuid4 from "uuid4";

const MyPost = () => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    urlAvatar: "",
    username: "",
    nickname: "",
    content: "",
    urlPhoto: "",
  });

  function handleAvatar(e) {
    const value = e.target.value;
    if (value) {
      setState({ ...state, urlAvatar: value });
    }
  }
  function handleUsername(e) {
    const value = e.target.options[e.target.selectedIndex].textContent;
    if (value) {
      setState({ ...state, username: value });
    }
  }

  function handleNickname(e) {
    const value = e.target.value;
    if (value) {
      setState({ ...state, nickname: value });
    }
  }
  function handleContent(e) {
    const value = e.target.value;
    if (value) {
      setState({ ...state, content: value });
    }
  }
  function handleUrlPhoto(e) {
    const value = e.target.value;
    if (value) {
      setState({ ...state, urlPhoto: value });
    }
  }

  function handleAmount(postId, actionType) {
    dispatch({
      type: "GET_NEW_AMOUNT",
      payload: { postId, actionType },
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newPost = {
      id: uuid4(),
      author: {
        name: state.username,
        photo: state.urlPhoto,
        nickname: state.nickname,
      },
      content: state.content,
      image: state.urlAvatar,
      date: new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
      }).format(new Date()),
      icon: checkmark,
      comment: comment,
      amountComment: 0,
      like: like,
      amountLike: 0,
      isLiked: false,
      isCommented: false,
    };

    dispatch({
      type: "GET_NEW_POST",
      payload: newPost,
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <legend htmlFor="newPost">
          <b>Create your own post: </b>
        </legend>
        <fieldset id="newPost">
          <input
            onChange={handleAvatar}
            type="text"
            placeholder="URL with photo for your avatar:"
          />
          <select onChange={handleUsername} name="username">
            <option value="sherlock">Sherlock Holmes</option>
            <option value="watson">Dr. Watson's</option>
            <option value="moriarty">Professor Moriarty</option>
            <option value="adler">Irene Adler</option>
            <option value="mrsWatson">Mary Watson</option>
          </select>
          <input
            onChange={handleNickname}
            type="text"
            placeholder="Your nickname:"
          />
          <input
            onChange={handleContent}
            type="text"
            placeholder="Your content:"
          />
          <input
            onChange={handleUrlPhoto}
            type="text"
            placeholder="URL with photo for your post:"
          />
          <button type="submit" className="btn-getPost">
            Create my post
          </button>
        </fieldset>
      </form>

      {posts.map((post, index) => {
        return (
          <div key={index} className="Post">
            <div className="Post-row">
              <img src={post.image} className="Post-avatar" alt="User`s face" />
              <h3>{post.author.name}</h3>
              <img src={post.icon} alt="Checkmark icon" />
              <h3>@{post.author.nickname}</h3>
              <span>
                <b>{post.date}</b>
              </span>
            </div>
            <p className="Post-content">
              <b>
                <em>{post.content}</em>
              </b>
            </p>
            <img
              src={post.author.photo}
              className="Post-photo"
              alt="User`s content"
            />
            <div className="Post-icons">
              <div className="Post-comment">
                <button
                  onClick={() => handleAmount(post.id, "isCommented")}
                  className="btn-posts"
                >
                  <b>{post.amountComment}</b>
                </button>
              </div>
              <div className="Post-like">
                <button
                  onClick={() => handleAmount(post.id, "isLiked")}
                  className="btn-posts btn-like"
                >
                  <b>{post.amountLike}</b>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

function Posts() {
  return (
    <div className="Posts">
      <MyPost />
    </div>
  );
}

export default Posts;
