import { styled } from "styled-components";
import { useIssue, useIssueDispatch } from "../../contexts/issueContext";
import IssueItem from "../common/IssueItem";
import Advertisement from "./Advertisement";
import { useNavigate } from "react-router-dom";
import Loading from "../common/Loading";
import { useEffect, useRef } from "react";

const Container = styled.div`
  padding: 12px 0px 66px 0px;
`;

const List = styled.div`
  cursor: pointer;
`;

function IssueList() {
  const pageEnd = useRef<HTMLDivElement>(null);
  const { data, loading, error } = useIssue();
  const dispatch = useIssueDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!error && dispatch && pageEnd.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(
          (entry) => {
            if (entry.isIntersecting && !loading) {
              dispatch();
            }
          },
          { threshold: 0.7 },
        );
      });
      observer.observe(pageEnd.current);
    }
  }, [dispatch, error, loading]);

  return (
    <Container>
      {error ? (
        <div>Error</div>
      ) : (
        data?.map((issue, index) => (
          <section key={issue?.number}>
            <List
              style={{
                borderBottom: (index + 1) % 4 === 0 ? "0px" : "1px solid gray",
              }}
              onClick={() => navigate(`/${issue?.number}`)}
            >
              <IssueItem
                comments={issue?.comments}
                title={issue?.title}
                createdAt={issue?.created_at}
                login={issue?.user?.login}
                number={issue?.number}
              />
            </List>
            {(index + 1) % 4 === 0 && <Advertisement />}
          </section>
        ))
      )}
      {loading ? <Loading /> : <div ref={pageEnd} />}
    </Container>
  );
}

export default IssueList;
