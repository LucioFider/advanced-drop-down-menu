import "./index.css";
import { AiOutlineBell } from "react-icons/ai";
import { RiMessengerLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { HiOutlineCog } from "react-icons/hi";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiBoltCircle } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

function App() {
  return (
    <Navbar>
      <NavItem icon={<AiOutlinePlusCircle />} />
      <NavItem icon={<AiOutlineBell />} />
      <NavItem icon={<RiMessengerLine />} />

      <NavItem icon={<BsThreeDotsVertical />}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={<HiOutlineCog />}
            rightIcon={<BsChevronDown />}
            goToMenu="settings"
          >
            Settings
          </DropdownItem>
          <DropdownItem
            leftIcon="🦧"
            rightIcon={<BsChevronDown />}
            goToMenu="animals"
          >
            Animals
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<AiOutlineArrowLeft />}>
            <h2>My Tutorial</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<BiBoltCircle />}>HTML</DropdownItem>
          <DropdownItem leftIcon={<BiBoltCircle />}>CSS</DropdownItem>
          <DropdownItem leftIcon={<BiBoltCircle />}>JavaScript</DropdownItem>
          <DropdownItem leftIcon={<BiBoltCircle />}>Awesome!</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "animals"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<AiOutlineArrowLeft />}>
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
          <DropdownItem leftIcon="🐸">Frog</DropdownItem>
          <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
          <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;
