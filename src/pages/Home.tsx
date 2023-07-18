/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import { useQuery } from "@apollo/client";

import { type PageData } from "../api/interface";
import { GET_MEDIA } from "../api/query";
import { Card, ErrorText, Loading, PageTitle, Paginator } from "../components";

const homeWrapperStyle = css({
  padding: "24px",
});

const contentWrapperStyle = css({
  marginTop: "24px",
  display: "grid",

  gridTemplateColumns: "repeat(5, 1fr)",
  gridGap: "24px",
  alignItems: "center",
  justifyItems: "center",

  "@media (max-width: 768px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

  "@media (max-width: 1024px)": {
    gridTemplateColumns: "repeat(3, 1fr)",
  },

  "@media (max-width: 480px)": {
    gridTemplateColumns: "repeat(1, 1fr)",

    "& a": {
      width: "100%",
    },
  },
});

const Home: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { loading, error, data } = useQuery<PageData>(GET_MEDIA, {
    variables: { page },
  });

  if (loading) return <Loading />;
  if (error != null) return <ErrorText message={error.message} />;

  return (
    <div css={homeWrapperStyle}>
      <PageTitle title="Our Collection" />
      <div css={contentWrapperStyle}>
        {data?.Page.media.map((media) => (
          <Card key={media.id} {...media} to={`/detail/${media.id}`} />
        ))}
      </div>
      <Paginator
        next={() => {
          setPage(page + 1);
        }}
        prev={() => {
          setPage(page - 1);
        }}
      />
    </div>
  );
};

export default Home;
