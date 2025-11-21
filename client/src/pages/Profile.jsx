import { useEffect, useState } from "react";
import api from "../utils/api";
import PostCard from "../components/PostCard";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user) return;
      try {
        // The backend route is /getallPostfromcreatedBY/:createdBY
        // Note: The backend controller for this route has logic:
        // if(user.role != "admin"){ return res.status(404).json({message : "your are not admin"}) }
        // This means ONLY admins can see posts by a specific user? That seems like a bug or strict requirement.
        // However, for the purpose of this demo, I will try to call it. 
        // If it fails for normal users, I might need to adjust the backend or just show a message.
        
        const { data } = await api.get(`/getallPostfromcreatedBY/${user.id}`);
        setPosts(data.Allpost || []);
      } catch (err) {
        // If it fails (e.g. not admin), we might want to handle it gracefully
        console.error("Fetch profile posts error", err);
        setError(err.response?.data?.message || "Failed to fetch your posts");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user]);

  if (loading) return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 text-center">
        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
        <p className="text-gray-600">{user?.email}</p>
        <p className="text-sm text-gray-500 mt-2 capitalize">{user?.role}</p>
      </div>

      <h2 className="text-xl font-bold mb-4 text-gray-800">My Posts</h2>
      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
          <p>{error}</p>
          {user?.role !== 'admin' && <p className="text-sm mt-1">Note: Current backend restriction allows only admins to view user-specific posts.</p>}
        </div>
      )}
      
      {posts.length === 0 && !error ? (
        <p className="text-center text-gray-500">You haven't created any posts yet.</p>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
};

export default Profile;
