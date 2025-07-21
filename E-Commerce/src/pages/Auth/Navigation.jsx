import {useState} from 'react';
import {FaHeart} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {AiOutlineHome,
     AiOutlineShoppingCart,
      AiOutlineUserAdd,
       AiOutlineLogin,
        AiOutlineShopping}
         from 'react-icons/ai';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../redux/authSlice';
import {useLoginMutation} from '../../redux/api/authApiSlice';





const Navigation = () => {
    const {userInfo} = userSelector(state => state.auth);

    const [dropdownOpen, setDropDownOpen]= useState(false)
    const [showSideBar, setShowSideBar] = useState(false);

    const toggleDropDown = ()=>{
        setDropDownOpen(!dropdownOpen);
    }

    const toggleSideBar = ()=>{
        setShowSideBar(!showSideBar);
    }

    const closeSideBar = ()=>{
        setShowSideBar(false)
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] useLoginMutation()

    const handleLogout = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error); 
        }
    };
 return (
  <div
    id='navigationContainer'
    className={`${showSideBar ? "hidden" : "flex"} xl:flex lg:flex md:hidden sm:hidden justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed transition-all duration-300`}
  >
    <div className='flex flex-col justify-center space-y-4'>
      <Link
        to="/"
        className='group flex items-center transition-transform transform hover:translate-x-2'
      >
        <AiOutlineHome className='mr-2 mt-[3rem]' size={26} />
        <span className='hidden group-hover:inline nav-item-name mt-[3rem]'>Home</span>
      </Link>

      <Link
        to="/shop"
        className='group flex items-center transition-transform transform hover:translate-x-2'
      >
        <AiOutlineShopping className='mr-2 mt-[3rem]' size={26} />
        <span className='hidden group-hover:inline nav-item-name mt-[3rem]'>Shop</span>
      </Link>

      <Link
        to="/cart"
        className='group flex items-center transition-transform transform hover:translate-x-2'
      >
        <AiOutlineShoppingCart className='mr-2 mt-[3rem]' size={26} />
        <span className='hidden group-hover:inline nav-item-name mt-[3rem]'>Cart</span>
      </Link>

      <Link
        to="/favorite"
        className='group flex items-center transition-transform transform hover:translate-x-2'
      >
        <FaHeart className='mr-2 mt-[3rem]' size={26} />
        <span className='hidden group-hover:inline nav-item-name mt-[3rem]'>Favorite</span>
      </Link>


        <div className='relative'>
            <button onClick={toggleDropDown} className='flex items-center justify-center w-full h-12 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300'> 

            </button>
        </div>

    <ul>
        <li>
            <Link
        to="/cart"
        className='group flex items-center transition-transform transform hover:translate-x-2'
      >
        <AiOutlineLogin className='mr-2 mt-[3rem]' size={26} />
        <span className='hidden group-hover:inline nav-item-name mt-[3rem]'>LogIn</span>
      </Link>
        </li>

        <li>
            <Link
        to="/register"
        className='group flex items-center transition-transform transform hover:translate-x-2'
      >
        <AiOutlineUserAdd className='mr-2 mt-[3rem]' size={26} />
        <span className='hidden group-hover:inline nav-item-name mt-[3rem]'>Register</span>
      </Link>
        </li>
    </ul>
    </div>
  </div>
);


}

export default Navigation;

