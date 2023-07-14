import IssueDetail from "../components/IssueDetail";
import IssueDetailProvider from "../contexts/issueDetailContext";

function DetailPage() {
  return (
    <IssueDetailProvider>
      <IssueDetail />
    </IssueDetailProvider>
  );
}

export default DetailPage;
