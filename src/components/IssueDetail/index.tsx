import Content from "./Content";
import IssueItem from "../common/IssueItem";
import { useLocation } from "react-router-dom";
import {
  useIssueDetail,
  useIssueDetailDIspatch,
} from "../../contexts/issueContext";
import Loading from "../common/Loading";
import { useCallback, useEffect } from "react";
import { styled } from "styled-components";

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
  const location = useLocation();
  const { data, loading, error } = useIssueDetail();
  const dispatch = useIssueDetailDIspatch();
  const diffPage = data?.number !== +location.pathname.replace(/[^0-9]/, "");

  const callbackDispatch = useCallback(
    (pathname: string) => {
      if (dispatch && !loading) dispatch(pathname);
    },
    [dispatch, loading],
  );

  useEffect(() => {
    if (!error && (diffPage || !data)) {
      callbackDispatch(location.pathname);
    }
  }, [callbackDispatch, diffPage, data, location.pathname, error]);

  return (
    <IssueDetailContainer>
      {error ? (
        <div>Error</div>
      ) : loading || diffPage ? (
        <Loading />
      ) : (
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
    </IssueDetailContainer>
  );
}

export default IssueDetail;
