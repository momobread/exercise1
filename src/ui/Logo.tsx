import styled from '@emotion/styled';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  /* height: 9.6rem; */
  height: 3em;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo-light.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
