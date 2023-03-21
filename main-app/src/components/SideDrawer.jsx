import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

const SideDrawer = (props) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      in={props.show}
      timeout={300}
      classNames='slide-in-left'
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      <Aside ref={nodeRef} onClick={props.closeNav}>
        {props.children}
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

  @media (min-width: 768px) {
    display: none;
  }
`;
