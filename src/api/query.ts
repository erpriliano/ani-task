import { gql } from "@apollo/client";

export const GET_MEDIA = gql`
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

export const GET_MEDIA_BY_ID = gql`
  query GetMediaById($id: Int) {
    Media(id: $id) {
      id
      title {
        romaji
        english
        native
      }
      bannerImage
      coverImage {
        medium
      }
      description
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      genres
      averageScore
      popularity
      status
      episodes
    }
  }
`;
