import { GET_MEDIA, GET_MEDIA_BY_ID } from "../api/query";

export const mocksData = [
  {
    request: {
      query: GET_MEDIA,
      variables: { page: 1 },
    },
    result: {
      data: {
        Page: {
          media: [
            {
              id: 1,
              title: {
                romaji: "Test Title",
                english: "Test Title",
              },
              coverImage: {
                medium: "https://example.com/image.jpg",
              },
              genres: ["Action", "Adventure", "Comedy"],
              averageScore: 80,
            },
            {
              id: 2,
              title: {
                romaji: "Test Title",
                english: "Test Title",
              },
              coverImage: {
                medium: "https://example.com/image.jpg",
              },
              genres: ["Action", "Adventure", "Comedy"],
              averageScore: 80,
            },
            {
              id: 3,
              title: {
                romaji: "Test Title",
                english: "Test Title",
              },
              coverImage: {
                medium: "https://example.com/image.jpg",
              },
              genres: ["Action", "Adventure", "Comedy"],
              averageScore: 80,
            },
            {
              id: 4,
              title: {
                romaji: "Test Title",
                english: "Test Title",
              },
              coverImage: {
                medium: "https://example.com/image.jpg",
              },
              genres: ["Action", "Adventure", "Comedy"],
              averageScore: 80,
            },
            {
              id: 5,
              title: {
                romaji: "Test Title",
                english: "Test Title",
              },
              coverImage: {
                medium: "https://example.com/image.jpg",
              },
              genres: ["Action", "Adventure", "Comedy"],
              averageScore: 80,
            },
            {
              id: 6,
              title: {
                romaji: "Test Title",
                english: "Test Title",
              },
              coverImage: {
                medium: "https://example.com/image.jpg",
              },
              genres: ["Action", "Adventure", "Comedy"],
              averageScore: 80,
            },
            {
              id: 7,
              title: {
                romaji: "Test Title",
                english: "Test Title",
              },
              coverImage: {
                medium: "https://example.com/image.jpg",
              },
              genres: ["Action", "Adventure", "Comedy"],
              averageScore: 80,
            },
            {
              id: 8,
              title: {
                romaji: "Test Title",
                english: "Test Title",
              },
              coverImage: {
                medium: "https://example.com/image.jpg",
              },
              genres: ["Action", "Adventure", "Comedy"],
              averageScore: 80,
            },
            {
              id: 9,
              title: {
                romaji: "Test Title",
                english: "Test Title",
              },
              coverImage: {
                medium: "https://example.com/image.jpg",
              },
              genres: ["Action", "Adventure", "Comedy"],
              averageScore: 80,
            },
            {
              id: 10,
              title: {
                romaji: "Test Title",
                english: "Test Title",
              },
              coverImage: {
                medium: "https://example.com/image.jpg",
              },
              genres: ["Action", "Adventure", "Comedy"],
              averageScore: 80,
            },
          ],
        },
      },
    },
  },
];

export const mocksDataById = [
  {
    request: {
      query: GET_MEDIA_BY_ID,
      variables: { id: "1" },
    },
    result: {
      data: {
        Media: {
          id: 1,
          title: {
            romaji: "Test Title",
            english: "Test Title English",
            native: "Test Title",
          },
          coverImage: {
            medium: "https://example.com/image.jpg",
          },
          status: "FINISHED",
          bannerImage: "https://example.com/image.jpg",
          popularity: 100,
          averageScore: 80,
          description: "Test Description",
          startDate: {
            year: 2020,
            month: 1,
            day: 1,
          },
          endDate: {
            year: 2020,
            month: 1,
            day: 1,
          },
          genres: ["Action", "Adventure", "Comedy"],
          episodes: 12,
        },
      },
    },
  },
];
