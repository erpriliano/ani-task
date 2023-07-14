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
