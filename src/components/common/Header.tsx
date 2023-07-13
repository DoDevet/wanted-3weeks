import { styled } from "styled-components";
import { ORGANIZATION, REPO } from "../../constants/common";

const FixedHeader = styled.div`
  position: fixed;
  width: 100%;
  color: white;
  margin: 0px auto;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  text-align: center;
  backdrop-filter: blur(12px);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

function Header() {
  return (
    <FixedHeader>
      {`${ORGANIZATION.charAt(0).toUpperCase() + ORGANIZATION.slice(1)} / ${
        REPO.charAt(0).toUpperCase() + REPO.slice(1)
      }`}
    </FixedHeader>
  );
}

export default Header;
