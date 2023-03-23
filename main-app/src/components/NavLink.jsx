import { Link } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import { useContext } from 'react';

export default function NavLink(props) {
  const { isLoggedIn, isAdmin, logout } = useContext(AuthContext);
  return (
    <>
      <ul>
        <li>
          <Link to='/about'>
            <div className='station'></div>
            <p>소개</p>
          </Link>
        </li>
        {isAdmin && (
          <li>
            <Link to='/admin/user'>
              <div className='station'></div>
              <p>관리자</p>
            </Link>
          </li>
        )}
        {isLoggedIn ? (
          <>
            <li>
              <Link to='/user'>
                <div className='station'></div>
                <p>마이페이지</p>
              </Link>
            </li>
            <li onClick={logout}>
              <Link>
                <div className='station'></div>
                <p>로그아웃</p>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/register'>
                <div className='station'></div>
                <p>회원가입</p>
              </Link>
            </li>
            <li>
              <Link to='/login'>
                <div className='station'></div>
                <p>로그인</p>
              </Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
}
