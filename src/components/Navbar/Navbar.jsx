import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons//io'
import { useState, useRef, useEffect } from 'react';
import { useJwt } from "react-jwt";
import useToken from '../../context/Helpers/useToken'
function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('session_token');
    navigate("/login", { replace: true });
  };
  const { token } = useToken();
  if (!token) {
    navigate("/login")
  }
  const { decodedToken, isExpired } = useJwt(token);
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  if (decodedToken == null || isExpired) {
    navigate("/login")
  } else {
    const user_name = decodedToken.unique_name.toString()
    const user_email = decodedToken.email.toString()
    const user_id = decodedToken.id
    return (
      <nav className="fixed top-0 z-50 w-full bg-white border-b">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <Link to={'/'} className="flex md:mr-24">
                <img
                  src="https://cs7100320020914ea8a.blob.core.windows.net/sopstorage/LOGO_SENA.jpg?sp=r&st=2023-09-28T02:05:57Z&se=2100-09-28T10:05:57Z&spr=https&sv=2022-11-02&sr=b&sig=DqfQ2kWWKlOcBaF%2B%2F%2FAs7Xn0U35%2FNbAjfgm%2BabALbj8%3D"
                  className="h-12  mr-3"
                  alt="SENA Logo"
                />
                <img
                  src="https://cs7100320020914ea8a.blob.core.windows.net/sopstorage/LOGO_SENAONPRINTING.jpg?sp=r&st=2023-09-28T02:03:30Z&se=2100-02-01T10:03:30Z&spr=https&sv=2022-11-02&sr=b&sig=zutUmXLt4eoU7%2BwWVemDcaE%2F%2B6mwXn2gyBkD7N7EtG8%3D"
                  className="h-12 mr-3"
                  alt="SENA Logo"
                />
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div className="ml-2">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user_email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
