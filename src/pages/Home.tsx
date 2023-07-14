import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

import { type PageData } from "../interface";
import { Loading } from "../components";

const GET_MEDIA = gql`
  query GetMedia($page: Int) {
    Page(page: $page, perPage: 10) {
      media(type: ANIME) {
        id
        title {
          romaji
          english
        }
        coverImage {
          medium
        }
        genres
        averageScore
      }
    }
  }
`;

const Home: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const { loading, error, data } = useQuery<PageData>(GET_MEDIA, {
    variables: { page },
  });

  if (loading) return <Loading />;
  if (error != null) return <p>Error :</p>;

  console.log(data?.Page);

  return (
    <div>
      <button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        +
      </button>
      <p>{page}</p>
      {data?.Page.media.map((media) => (
        <h3 key={media.id}>{media.title.english}</h3>
      ))}
    </div>
  );
};

export default Home;
