import { Link } from "react-router-dom";
import { styled } from "styled-components";

const LinkComponent = styled(Link)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  padding: 14px 0px;
`;
function Advertisement() {
  return (
    <div style={{ display: "flex" }}>
      <LinkComponent to="https://www.wanted.co.kr/">
        <img
          alt="adImage"
          src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100 "
        />
      </LinkComponent>
    </div>
  );
}

export default Advertisement;
