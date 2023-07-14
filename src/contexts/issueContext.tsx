import { createContext, useContext, useState } from "react";
import { Issue, IssueList } from "../types/issue";
import client from "../apis/axiosInstance";
import { useParams } from "react-router-dom";

type IssueState = {
  data: IssueList | null;
  loading: boolean;
  error: any;
};

type DetailIssueState = {
  data: Issue | null;
  loading: boolean;
  error: any;
};

const IssueStateContext = createContext<IssueState>({
  data: null,
  loading: false,
  error: null,
});
const IssueDispatchContext = createContext<{ (): void } | null>(null);

export const useIssue = () => useContext(IssueStateContext);
export const useIssueDispatch = () => useContext(IssueDispatchContext);

const IssueProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<IssueState>({
    data: null,
    loading: false,
    error: null,
  });

  const [page, setPage] = useState(1);
  const [endPage, setEndPage] = useState(false);

  const dispatchIssue = () => {
    if (endPage) return;
    setData((prev) => ({ ...prev, loading: true }));
    client({ params: { page, per_page: 30, sort: "comments" } })
      .then((res) => res.data)
      .then((data) =>
        setData((prev) => {
          if (data.length !== 30) setEndPage(true);
          return {
            ...prev,
            data: prev.data ? [...prev.data, ...data] : [...data],
          };
        }),
      )
      .catch((e) => setData((prev) => ({ ...prev, error: e })))
      .finally(() => setData((prev) => ({ ...prev, loading: false })));
    setPage((prev) => prev + 1);
  };

  return (
    <IssueStateContext.Provider value={data}>
      <IssueDispatchContext.Provider value={dispatchIssue}>
        {children}
      </IssueDispatchContext.Provider>
    </IssueStateContext.Provider>
  );
};

export default IssueProvider;
