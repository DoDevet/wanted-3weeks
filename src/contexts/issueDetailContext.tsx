import {
  useCallback,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";
import { useParams } from "react-router-dom";

import client from "../apis/axiosInstance";
import { Issue } from "../types/issue";

type DetailIssueState = {
  data: Issue | null;
  loading: boolean;
  error: any;
};

const IssueDetailStateContext = createContext<DetailIssueState>({
  data: null,
  error: null,
  loading: false,
});
const IssueDetailDispatchContext = createContext<((id: string) => void) | null>(
  null,
);

export const useIssueDetail = () => useContext(IssueDetailStateContext);
export const useIssueDetailDIspatch = () =>
  useContext(IssueDetailDispatchContext);

const IssueDetailProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [detailData, setDetailData] = useState<DetailIssueState>({
    data: null,
    loading: false,
    error: null,
  });
  const { id } = useParams();
  const dispatchDetailIssue = useCallback((id: string) => {
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
  }, []);
  useEffect(() => {
    if (id) dispatchDetailIssue(id);
  }, [id, dispatchDetailIssue]);

  return (
    <IssueDetailDispatchContext.Provider value={dispatchDetailIssue}>
      <IssueDetailStateContext.Provider value={detailData}>
        {children}
      </IssueDetailStateContext.Provider>
    </IssueDetailDispatchContext.Provider>
  );
};

export default IssueDetailProvider;
