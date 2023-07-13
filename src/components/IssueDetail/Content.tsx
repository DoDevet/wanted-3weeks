import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { styled } from "styled-components";

const Layout = styled.div`
  h1 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 15px;
  }
  img {
    max-width: 39rem;
  }
  pre {
    padding: 2rem;
    line-height: 1.5rem;
    margin: 2rem auto;
    code {
      word-break: break-word;
    }
    width: 100%;
    max-width: 36rem;
  }
  a {
    color: #55bee8;
  }
  padding: 16px 0px;
`;
function Content({ body }: { body: string }) {
  return (
    <Layout>
      <ReactMarkdown
        rawSourcePos
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
      >
        {body}
      </ReactMarkdown>
    </Layout>
  );
}

export default Content;
