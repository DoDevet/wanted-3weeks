import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
const SECOND = 3;
function Error() {
  const [second, setSecond] = useState(SECOND);
  const navigate = useNavigate();

  useEffect(() => {
    if (second <= 0) navigate("/");
    const Count = () => {
      setSecond((prev) => prev - 1);
    };
    const interval = setInterval(Count, 1000);
    return () => clearInterval(interval);
  }, [second, navigate]);

  return (
    <ErrorContainer>
      <p>Error!</p>
      <Link to={"/"}>{`Go to Homepage in ${second}`}</Link>
    </ErrorContainer>
  );
}
export default Error;
