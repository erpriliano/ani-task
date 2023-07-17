/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { Link, useParams } from "react-router-dom";
import { Card, PageTitle } from "../components";

const pageWrapperStyle = css({
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

const CollectionDetail: React.FC = () => {
  const { media } = useParams<{ media: string }>();
  const [dataCollection, setDataCollection] = useState<any>([]);

  useEffect(() => {
    const myCollection = localStorage.getItem("myCollection");
    const parsedMyCollection =
      myCollection !== null ? JSON.parse(myCollection) : [];

    const dataCollection = parsedMyCollection.filter((item: any) =>
      item.collectionName.includes(media),
    );

    setDataCollection(dataCollection);
  }, []);

  return (
    <div css={pageWrapperStyle}>
      <PageTitle title={media} />
      <div css={contentWrapperStyle}>
        {dataCollection.length === 0 && <p>Still empty :(</p>}
        {dataCollection.map((data: any) => (
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          <Link key={data.id} to={`/detail/${data.id}`}>
            <Card {...data} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CollectionDetail;
