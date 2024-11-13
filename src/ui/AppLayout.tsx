import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.tsx';
import Header from './Header.tsx';
import styled from '@emotion/styled';

const StyledAppLayout = styled.div`
  display: flex;
  grid-template-columns: 30rem 1fr;
  grid-template-rows: auto 1fr;
  flex-direction: column;
  height: 100vh;
`;

// const Main = styled.main`
//   background-color: var(--color-grey-50);
//   padding: 4rem 4.8rem 6.4rem;
// `;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      {/* <Main> */}
      <Outlet />
      {/* </Main> */}
    </StyledAppLayout>
  );
}

export default AppLayout;
