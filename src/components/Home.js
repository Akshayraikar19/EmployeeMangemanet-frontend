import { useAuth } from "../context/AuthContext";

export default function Home() {
    const { user } = useAuth();
    
    return (
        <div>
            <h2>Home Component</h2>
            {!user?.isLoggedIn ? (
                <p>User not logged in</p>
            ) : (
                <p>Welcome {user.username}</p>
            )}
        </div>
    );
}
