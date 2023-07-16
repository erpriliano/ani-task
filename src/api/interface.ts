export interface Media {
  id: number;
  title: {
    romaji: string;
    english: string;
  };
  coverImage: {
    medium: string;
  };
  genres: string[];
  averageScore: number;
}

export interface PageData {
  Page: {
    media: Media[];
  };
}

export type MediaById = Media & {
  bannerImage: string;
  description: string;
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  endDate: {
    year: number;
    month: number;
    day: number;
  };
  popularity: number;
  status: string;
  episodes: number;
};

export interface MediaByIdData {
  Media: MediaById;
}
