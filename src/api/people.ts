import { useQuery } from "@tanstack/react-query";
import api from "~/api/config";
import { Credits } from "~/domain/credits";

// /movie/{movie_id}/credits
export const useGetCredits = (id: number) => {
	return useQuery({
	  queryKey: ["movie", id,"credits"],
	  queryFn: async () => {
		const response = await api.get<Credits>(
		  `movie/${id}/credits`
		);
  
		return response.data;
	  },
	});
  };
  