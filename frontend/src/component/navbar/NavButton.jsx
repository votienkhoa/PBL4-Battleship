
import PropTypes from 'prop-types';
import styled from "@emotion/styled";

const StyledButton = styled.button`
  background-color: transparent;
  border-style: none;
  text-align: center;
  display: inline-block;
  width: 139px;
  height: 40px;
  transform: skew(-35deg);
  padding: 0;
  cursor: ${({ isNav }) => (isNav ? 'default' : 'pointer')};
  filter: ${({ isNav }) => (isNav ? 'none' : 'brightness(0.9)')};

  &:hover {
    filter: ${({ isActive, isNav }) => (!isActive && !isNav ? 'brightness(0.9)' : 'none')};
  }

  &:active {
    filter: ${({ isNav }) => (!isNav ? 'brightness(0.8)' : 'none')};
  }
  &.active {
    opacity: 1;
    background-color: #b846ff;
  }
`;

const StyledParagraph = styled.p`
  color: white;
  font-family: 'Inter', sans-serif;
  font-style: italic;
  font-weight: 600;
  font-size: 15px;
  margin: 0;
  letter-spacing: 2.5px;
  transform: skew(35deg);
`;

function NavButton({ name = 'Unnamed', isActive, isNav }) {
    return (
        <StyledButton isActive={isActive} isNav={isNav} className={isActive ? 'active' : ''}>
            <StyledParagraph>{name}</StyledParagraph>
        </StyledButton>
    );
}

NavButton.propTypes = {
    name: PropTypes.string,
    isActive: PropTypes.bool,
    isNav: PropTypes.bool,
};

export default NavButton;
