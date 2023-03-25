export const SORT_BY = [
  "popularity.desc",
  "release_date.desc",
  "revenue.desc",
  "original_title.asc",
  "vote_average.desc",
  "vote_count.desc",
] as const;

export type SortValue = (typeof SORT_BY)[number];
