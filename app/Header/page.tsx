"use client";

import { useState } from "react";
import styled from "styled-components";
import GlobalStyle from "../GlobalStyles";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #c9770a;
  color: #fff;
  position: relative;
`;

const MenuToggle = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  
`;

const SideMenu = styled.nav<{ open: boolean }>`
  height: 100%;
  width: ${({ open }) => (open ? "250px" : "0")};
  position: fixed;
  top: 0;
  left: 0;
  background-color: #a66108;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
  z-index: 1;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  margin: 0.5rem 0;
`;

const StyledLink = styled.a`
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #ffffff;
  display: block;
  transition: 0.3s;
  
  &:hover {
    color: #f1f1f1;
  }
`;

const CloseButton = styled.a`
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
  cursor: pointer;
  color: white;
`;
const HeaderTitleContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const HeaderTitle = styled.p`
color: white;
font-size: x-large;
font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
margin: 0;

`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <GlobalStyle />
      <HeaderContainer>
        <MenuToggle onClick={toggleMenu}>&#9776;</MenuToggle>
        <HeaderTitleContainer>

        <HeaderTitle>Quizzers</HeaderTitle>
        </HeaderTitleContainer>
      </HeaderContainer>
      <SideMenu open={menuOpen}>
        <CloseButton onClick={toggleMenu}>&times;</CloseButton>
        <MenuList>
          <MenuItem>
            <StyledLink href="/">Home</StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink href="/posts">Add new event</StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink href="/posts">All events</StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink href="/posts">Login</StyledLink>
          </MenuItem>
          {/* Add more links as needed */}
        </MenuList>
      </SideMenu>
    </>
  );
}