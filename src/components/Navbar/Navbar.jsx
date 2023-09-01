import { Link, useNavigate } from 'react-router-dom'
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons//io'
import { useState, useRef, useEffect } from 'react';

function Navbar () {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);  // Referencia al elemento del menú

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);  // Cierra el menú si se hace clic fuera de él
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('session_token');
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    // Agrega un event listener para detectar clics fuera del componente
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Limpia el event listener cuando el componente se desmonta
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <span className="sr-only">Abrir sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <Link to={'/dashboard'} className="flex md:mr-24">
              <img
                src="../public/img/LOGO_SENA.jpg"
                className="h-12  mr-3"
                alt="SENA Logo"
              />
              <img
                src="../public/img/LOGO_SENAONPRINTING.jpg"
                className="h-12 mr-3"
                alt="SENA Logo"
              />
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ml-3">
              <div>
                <button
                  type="button"
                  className="flex text-sm rounded-full focus:ring-4 focus:ring-gray-300"
                  aria-expanded={dropdownOpen ? 'true' : 'false'}
                  onClick={toggleDropdown}
                  data-dropdown-toggle="dropdown-user"
                >
                  <span className="sr-only">Abrir menu de usuario</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="user photo"
                  />
                {dropdownOpen?<IoIosArrowUp className="h-6 w-6 ml-2" />:<IoIosArrowDown className="h-6 w-6 ml-2" />} 

                </button>
              </div>
              <div
          ref={dropdownRef}  // Asigna la referencia al elemento del menú
          className={`z-50 ${dropdownOpen ? 'block' : 'hidden'} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow`}
          id="dropdown-user"
        >
                <div className="px-4 py-3" role="none">
                  <p
                    className="text-sm text-gray-900 dark:text-white"
                    role="none"
                  >
                    Usuario
                  </p>
                  <p
                    className="text-sm font-medium text-gray-900 truncate"
                    role="none"
                  >
                    correo@correo.com
                  </p>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Configuración
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
