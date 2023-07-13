import React from "react";
import { styled } from "styled-components";

interface IssueItemProp {
  number: number;
  title: string;
  login: string;
  createdAt: string;
  comments: number;
  avatar?: string;
}
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 4px;
  min-height: 69px;

  img {
    position: absolute;
    display: inline;
    width: 46px;
    height: 46px;
    border-radius: 100%;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;

  span {
    padding: 5px;
  }
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Comments = styled.span`
  min-width: fit-content;

  font-size: 14px;
`;

function IssueItem({
  number,
  title,
  login,
  createdAt,
  comments,
  avatar,
}: IssueItemProp) {
  return (
    <Container
      style={{
        borderBottom: avatar ? "1px solid gray" : "",
      }}
    >
      {avatar && <img src={avatar} alt="avatar" />}
      <Section style={{ paddingLeft: avatar ? "52px" : "0" }}>
        <Item>
          <span style={{ marginRight: 3, color: "skyblue" }}>#{number}</span>
          <span>{title}</span>
        </Item>
        <Item style={{ marginTop: 3, fontSize: "14px" }}>
          <span style={{ color: "violet" }}>{login}</span>
          <span>
            {createdAt &&
              Intl.DateTimeFormat("ko-KR").format(new Date(createdAt))}
          </span>
        </Item>
      </Section>
      <Comments>코멘트 : {comments}</Comments>
    </Container>
  );
}

export default React.memo(IssueItem);
