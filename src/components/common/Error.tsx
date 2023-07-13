import { Link } from "react-router-dom";
import { styled } from "styled-components";

const ErrorContainer = styled.div`
  text-align: center;
  padding: 12px 0px;

  p {
    font-size: 20px;
    font-weight: 600;
    color: tomato;
  }
  a {
    font-size: 18px;
    color: skyblue;
  }
`;
function Error() {
  return (
    <ErrorContainer>
      <p>Error!</p>
      <Link to={"/"}>{`Go to Homepage`}</Link>
    </ErrorContainer>
  );
}
export default Error;
