import useSWR from 'swr';
import { FoodData } from '../interface/FoodData';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useRecentFoodData() {
  const { data, error } = useSWR<FoodData[]>('/food/recent', fetcher);

  return {
    recentData: data,
    isLoading: !error && !data,
    isError: error,
  };
}
