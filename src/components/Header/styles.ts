import styled from "styled-components";
import { NavLink } from 'react-router-dom'

export const NavContainer = styled.nav`
    width: 100vw;
    height: 3rem;
    background-color: #111111;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    z-index: 10;
    padding: 0 1rem;
    border-bottom: 1px solid black;

    > span {
        font-family: cursive;
        font-size: 1.125rem;
    }
`

export const CustomNavLink = styled(NavLink)`
    text-decoration: none;
    color: #cccccc;
    font-size: 0.875rem;

    :hover {
        color: gray;
    }
`