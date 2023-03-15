import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SideDrawer = (props) => {
  return (
    <CSSTransition
      in={props.show}
      //   timeout={500}
      classNames='slide-in-left'
      mountOnEnter
      unmountOnExit
    >
      <Aside>
        <ul>
          <li onClick={props.closeNav}>
            <Link to='/about'>소개</Link>
          </li>
          <li onClick={props.closeNav}>
            <Link to='/'>역찾기</Link>
          </li>
        </ul>
        <ul>
          <li onClick={props.closeNav}>
            <Link to='/admin/user'>관리자</Link>
          </li>
          <li onClick={props.closeNav}>
            <Link to='/register'>회원가입</Link>
          </li>
          <li onClick={props.closeNav}>
            <Link to='/login'>로그인</Link>
          </li>

          <li onClick={props.closeNav}>
            <Link to='/user'>마이페이지</Link>
          </li>
        </ul>
      </Aside>
    </CSSTransition>
  );
};

export default SideDrawer;

const Aside = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  height: 100vh;
  width: 45%;
  background: white;
  ul {
    list-style: none;
    padding-top: 3rem;

    li {
      padding-bottom: 1rem;

      @media (max-width: 768px) {
        font-size: 0.8rem;
      }
    }
  }
`;
