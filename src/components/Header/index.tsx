import { NavLink } from 'react-router-dom'
import { CustomNavLink, NavContainer } from './styles'

export function Header() {
  return (
    <NavContainer>
        <CustomNavLink to='/' title='Vote'>
            Vote
        </CustomNavLink>
            <span>Funniest Cat Awards</span>
        <CustomNavLink to='/list' title='List'>
            Winners
        </CustomNavLink>
    </NavContainer>
  )
}