import { Outlet } from "react-router-dom";

import Header from "../components/common/Header";
import { styled } from "styled-components";
import IssueProvider from "../contexts/issueContext";

const Main = styled.div`
  max-width: 39rem;
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  padding-top: 3rem;

  margin: 0px auto;
`;
function Layout() {
  return (
    <IssueProvider>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </IssueProvider>
  );
}

export default Layout;
