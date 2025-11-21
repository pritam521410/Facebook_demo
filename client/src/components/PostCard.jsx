import { useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const PostCard = ({ post }) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(post.likedBy.includes(user?.id));

  const handleLike = async () => {
    try {
      const { data } = await api.put(`/likePost?_id=${post._id}`);
      setLikes(data.post.likes);
      setLiked(true);
    } catch (error) {
      console.error("Error liking post", error);
      alert(error.response?.data?.message || "Error liking post");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold mr-3">
          {post.createdBY?.name?.charAt(0).toUpperCase() || "U"}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{post.createdBY?.name || "Unknown User"}</h3>
          <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      
      <h4 className="text-lg font-medium mb-2">{post.title}</h4>
      <p className="text-gray-700 mb-4">{post.description}</p>
      
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-md mb-4" />
      )}

      <div className="flex items-center justify-between border-t pt-3">
        <button
          onClick={handleLike}
          disabled={liked}
          className={`flex items-center gap-2 ${
            liked ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
          } font-medium transition`}
        >
          <span>👍</span>
          <span>{likes} Likes</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
