import checkmark from "./img/check.png";
import comment from "./img/comment.png";
import like from "./img/like.png";
import photoOne from "./img/contentPhoto1.webp";
import photoTwo from "./img/contentPhoto2.avif";
import avatarOne from "./img/avatarOne.png";
import avatarTwo from "./img/avatarTwo.webp";
import uuid4 from "uuid4";

const initialState = {
  posts: [
    {
      id: uuid4(),
      author: {
        name: "Sherlock Holmes",
        photo: photoOne,
        nickname: "sherlock",
      },
      content: "You see, but you do not observe.",
      image: avatarOne,
      date: "16 Jun 2012",
      icon: checkmark,
      comment: comment,
      amountComment: 790,
      like: like,
      amountLike: 13650,
      isLiked: false,
      isCommented: false,
    },
    {
      id: uuid4(),
      author: {
        name: "Irene Adler",
        photo: photoTwo,
        nickname: "i_adler",
      },
      content: "Brainy is the new...",
      image: avatarTwo,
      date: "17 Jun 2012",
      icon: checkmark,
      comment: comment,
      amountComment: 666,
      like: like,
      amountLike: 14201,
      isLiked: false,
      isCommented: false,
    },
  ],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_NEW_POST":
      return { ...state, posts: [...state.posts, action.payload] };
    case "GET_NEW_AMOUNT":
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === action.payload.postId) {
            const amount =
              action.payload.actionType === "isCommented"
                ? "amountComment"
                : "amountLike";
            return {
              ...post,
              [action.payload.actionType]: !post[action.payload.actionType],
              [amount]: post[action.payload.actionType]
                ? post[amount] - 1
                : post[amount] + 1,
            };
          }
          return post;
        }),
      };
    default:
      return state;
  }
};
