import { createContext, useContext, useState } from "react";
import { Issue, IssueList } from "../types/issue";
import client from "../apis/axiosInstance";

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

const IssueDetailStateContext = createContext<DetailIssueState>({
  data: null,
  loading: false,
  error: null,
});

const IssueDetailDispatchContext = createContext<{ (id: string): void } | null>(
  null,
);

export const useIssue = () => useContext(IssueStateContext);
export const useIssueDispatch = () => useContext(IssueDispatchContext);
export const useIssueDetail = () => useContext(IssueDetailStateContext);
export const useIssueDetailDIspatch = () =>
  useContext(IssueDetailDispatchContext);

const IssueProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<IssueState>({
    data: null,
    loading: false,
    error: null,
  });
  const [detailData, setDetailData] = useState<DetailIssueState>({
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

  const dispatchDetailIssue = (id: string) => {
    setDetailData((prev) => ({ ...prev, error: null, loading: true }));
    client
      .get(id)
      .then((res) => res.data)
      .then((data) =>
        setDetailData((prev) => ({
          ...prev,
          data,
        })),
      )
      .catch((e) =>
        setDetailData((prev) => ({ ...prev, data: null, error: e })),
      )
      .finally(() => setDetailData((prev) => ({ ...prev, loading: false })));
  };

  return (
    <IssueStateContext.Provider value={data}>
      <IssueDispatchContext.Provider value={dispatchIssue}>
        <IssueDetailDispatchContext.Provider value={dispatchDetailIssue}>
          <IssueDetailStateContext.Provider value={detailData}>
            {children}
          </IssueDetailStateContext.Provider>
        </IssueDetailDispatchContext.Provider>
      </IssueDispatchContext.Provider>
    </IssueStateContext.Provider>
  );
};

export default IssueProvider;
