import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout();
  const { user, loading } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/dashboard" className="text-white text-2xl font-bold">
          SKYEARTHLABS
        </Link>
        <nav>
          {!loading && user && (
            <div className="text-white">
              <span className="mr-4">{user.email}</span>
              <button
                className="bg-transparent border border-solid border-white rounded px-3 py-1"
                onClick={handleClick}
              >
                Log out
              </button>
            </div>
          )}
          {!loading && !user && (
            <div className="text-white">
              <Link className="mr-4" to="/login">
                Login
              </Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
