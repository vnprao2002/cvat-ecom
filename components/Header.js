import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";

const StyledHeader = styled.header`
  background-color: #ddd0c8;
`;
const Logo = styled(Link)`
  color: #323232;
  text-decoration: none;
  position: relative;
  z-index: 3;
  font-family: "Comfortaa", sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  ${(props) =>
    props.mobileNavActive
      ? `
    display: block;
  `
      : `
    display: none;
  `}
  gap: 30px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 0px 20px 20px;
  background-color: #ddd0c8;
  font-weight: 400;
  font-size: 20px;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 15px 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color: #323232;
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
  &:hover {
    color: grey;
    scale: 1.1;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>
            <img src="https://i.ibb.co/zVFx6FX/logo.png" alt="logo" />
          </Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Trang chủ</NavLink>
            <NavLink href={"/products"}>Sản phẩm</NavLink>
            <NavLink href={'/aboutus'}>Chúng tôi</NavLink>
            {/* <NavLink href={'/account'}>Account</NavLink> */}
            <NavLink href={"/cart"}> Giỏ hàng ({cartProducts.length})</NavLink>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
