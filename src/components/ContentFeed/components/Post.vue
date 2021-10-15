<template>
  <div class="wrapper">
    <div class="post-avatar">
      <div class="d-flex justify-content-center align-items-center">
        <span @click="goToProfileHandler"><b-avatar text="BV"></b-avatar></span>
      </div>
      <div class="info d-flex flex-column align-items-start">
        <p class="username m-0">@{{ currentPost.user.username }}</p>

        <p class="date font-weight-lighter">
          {{ formatString(currentPost.created_at) }}
        </p>
      </div>
      <b-icon-three-dots @click="editPost()" />
    </div>
    <div class="post-content pl-5">
      <p v-if="!editable" class="comment-txt">
        {{ currentPost.content }}
      </p>
      <textarea
        v-else
        v-model="currentPost.content"
        v-on:keyup.enter="updatePost()"
      ></textarea>
      <div class="action-icons">
        <div>
          1
          <b-icon-chat @click="newCommentHandler" />
        </div>
        <div class="d-flex ml-2">
          {{ currentPost.likes.length }}
          <div class="ml-1" v-bind:class="[votedPost ? 'voted' : 'not-voted']">
            <b-icon-suit-heart-fill @click="vote(currentPost.id)" />
          </div>
        </div>
      </div>
      <div v-if="isCommenting">
        <div class="form-group">
          <input
            class="form-control form-control-sm"
            type="text"
            placeholder="new comment.."
            v-model="newComment"
          />
        </div>
        <div class="d-flex flex-column justify-content-end align-items-end">
          <div class="comment-post-action-wrapper d-flex flex-row">
            <b-button
              size="sm"
              pill
              variant="primary"
              class="mr-2"
              @click="sendCommentHandler"
              >Send</b-button
            >
            <b-button
              size="sm"
              pill
              variant="outline-danger"
              @click="newCommentHandler"
              >X</b-button
            >
          </div>
        </div>
      </div>
    </div>
    <div
      class="post-comments"
      v-for="comment in currentPost.comments"
      :key="comment.id"
    >
      <b-avatar class="icon"></b-avatar>
      <div class="comment">
        <p class="">@{{ comment.author }}</p>
        <p class="comment-txt">{{ comment.content }}</p>
      </div>
    </div>

    <div class="overflow-auto"></div>
  </div>
</template>

<script>
import { getFromLocal } from "@/utils/localStorage";
import { updatePost } from "@/services/post";
export default {
  name: "Post",
  data() {
    return {
      items: [
        { id: 1, message: "Hello bro!" },
        { id: 2, message: "Yet another comment" },
      ],
      votedPost: false,
      editable: false,
      isCommenting: false,
      newComment: "",
    };
  },
  computed: {
    userId() {
      const userId = getFromLocal("user").user.id;
      return userId;
    },
    user() {
      return getFromLocal("user");
    },
    currentPost() {
      const currentPost = this.$store.state.posts.filter((post) => {
        return post.id.trim() == this.$props.data.id.trim() ? post : null;
      });

      return currentPost.length !== 0 ? currentPost[0] : null;
    },
  },

  props: ["data"],
  created() {
    const canEditPost = this.determinePostOwnership();
    if (canEditPost) {
      // this.editable = true;
    }
    const hasLiked = this.$props.data.likes.find(
      (userId) => userId == this.userId
    );
    if (hasLiked) {
      this.votedPost = true;
    }
  },
  mounted() {},
  methods: {
    vote(id) {
      if (!this.votedPost) {
        this.votedPost = !this.votedPost;
        const newLikesArray = this.$props.data.likes.concat(this.userId);
        updatePost({
          newPostData: { likes: newLikesArray },
          postId: this.$props.data.id,
        }).then((res) => {
          this.$store.dispatch("votePost", { updatedPost: res.data });
          // console.log('res',res);
          // this.$store.dispatch("updatePost", res.data);
        });
      } else {
        const newLikesArray = this.$props.data.likes.filter(
          (like) => like !== this.userId
        );
        updatePost({
          newPostData: { likes: newLikesArray },
          postId: this.$props.data.id,
        }).then((res) => {
          // console.log('downvoted post resul', res.data);
          this.$store.dispatch("updatePost", res.data);
          this.votedPost = false;
        });
      }
    },
    editPost() {
      const canEditPost = this.determinePostOwnership();
      if (canEditPost) {
        this.editable = !this.editable;
      }
    },
    updatePost() {
      const newPostContent = this.$props.data.content.replace("\n", "");
      updatePost({
        newPostData: { content: newPostContent },
        postId: this.$props.data.id,
      }).then((res) => {
        this.$store.dispatch("updatePost", res.data);
        this.editable = false;
      });
    },
    determinePostOwnership() {
      const ownershipResult =
        this.$props.data.user.id.trim() == this.userId.trim() ? true : false;
      return ownershipResult;
    },
    hasVotedPost() {
      const hasLiked = this.$props.data.likes.find(
        (userId) => userId == this.userId
      );
      return hasLiked !== undefined ? true : false;
    },
    newCommentHandler() {
      this.isCommenting = !this.isCommenting;
    },
    sendCommentHandler() {
      updatePost({
        newPostData: {
          newComment: {
            comment: this.newComment,
            author: this.user.user.username,
          },
        },
        postId: this.$props.data.id,
      }).then((res) => {
        this.$store.dispatch("updatePost", res.data);
      });
    },
    formatString(stringDate) {
      var options = { year: "numeric", month: "short", day: "numeric" };
      let postDate = new Date(stringDate);
      return postDate.toLocaleDateString("en-US", options);
    },
    goToProfileHandler() {
      this.$router.push({ name: `Profile`, params:{id: `${this.currentPost.user.id}`} });
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  /* background-color: #e7f5ff; */
  /* background-color: #dff9fd ; */
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
}

.wrapper .post-avatar {
  display: flex;
  gap: 1rem;
}

.info .date {
  font-size: 0.8rem;
}
.wrapper .post-content {
  margin: 0.5rem 0.5rem;
  width: 90%;
}
.action-icons {
  margin-top: 0.5rem;
  text-align: center;
  display: flex;
  justify-content: center;
}
.action-icons :first-child {
  margin-right: 0.2rem;
}
.post-comments {
  display: flex;
  margin-left: 1rem;
  margin-top: 1rem;
}
.comment {
  flex: 1;
  border: 1px solid #ede9e9;
  display: table-cell;
  margin-left: 20px;
  margin-right: 1rem;
  padding: 10px;
  vertical-align: top;
  position: relative;
  width: 65%;
}
.username {
  font-weight: bold;
}
.comment-txt {
  font-size: 0.9rem;
  color: #575757;
}
.comment::before {
  border-bottom: 10px solid transparent;
  border-right: 11px solid #ede9e9;
  border-top: 10px solid transparent;
  left: -11px;
  top: 10px;
  position: absolute;
  content: "";
}
.comment::after {
  border-bottom: 8px solid transparent;
  border-right: 9px solid #fff;
  border-top: 8px solid transparent;
  left: -9px;
  top: 12px;
  position: absolute;
  content: "";
}
.post-comments > .comment {
  color: #707070;
}

/* icons */
.bi-suit-heart-fill > * {
  cursor: pointer;
  transition: all 2s;
  font-size: 1rem;
  /* color: rgb(146, 10, 10); */
}
.not-voted {
  color: rgb(206, 206, 206) !important;
}
.voted {
  color: rgb(201, 69, 69);
}
.bi-suit-heart-fill:hover {
  transition: all 1s;
  font-size: 1.5rem;
}

/* Edit Post Icon */
.bi-three-dots {
  cursor: pointer;
}

.comment-post-action-wrapper {
  /* width: 20%; */
}
</style>
