import Content from "./Content";
import IssueItem from "../common/IssueItem";
import Loading from "../common/Loading";
import { styled } from "styled-components";
import { useIssueDetail } from "../../contexts/issueDetailContext";
import Error from "../common/Error";

const IssueDetailContainer = styled.div`
  padding-top: 12px;
`;

const Items = styled.div`
  pre {
    background: #312f2f;
    border: 1px solid gray;
    border-left: 3px solid darkkhaki;
    color: white;
    page-break-inside: avoid;
    font-family: monospace;
    font-size: 13px;
    line-height: 1.6;
    margin-bottom: 1.6em;
    max-width: 100%;
    overflow: auto;
    padding: 1rem 1.25rem;
    display: block;
    word-wrap: break-word;
  }

  h1,
  h2 {
    border-bottom: 1px solid gray;
    padding-bottom: 12px;
  }
  h1 {
    font-size: 32px;
  }
`;

function IssueDetail() {
  const { data, loading, error } = useIssueDetail();

  return (
    <IssueDetailContainer>
      {data && (
        <Items>
          <IssueItem
            comments={data.comments}
            createdAt={data.created_at}
            login={data.user.login}
            number={data.number}
            title={data.title}
            avatar={data.user.avatar_url}
          />
          <Content body={data.body} />
        </Items>
      )}
      {error && <Error />}
      {loading && <Loading />}
    </IssueDetailContainer>
  );
}

export default IssueDetail;
