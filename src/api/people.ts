import { useQuery } from "@tanstack/react-query";
import api from "~/api/config";
import { Credits } from "~/domain/credits";

export const useGetCredits = (id: number) => {
  return useQuery({
    queryKey: ["movie", id, "credits"],
    queryFn: async () => {
      const response = await api.get<Credits>(`movie/${id}/credits`);
      const director =
        response.data.crew.find((member) => {
          return member.job == "Director";
        })?.name ?? "";
      const writer =
        response.data.crew.find((member) => {
          return ["Writer", "Screenplay"].includes(member.job);
        })?.name ?? "";
      return { director, writer, cast: response.data.cast };
    },
  });
};
