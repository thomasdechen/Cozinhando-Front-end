import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FoodData } from '../interface/FoodData';

const API_URL = 'http://localhost:8080';

const postData = async (data: FoodData): Promise<any> => {
    const response = await axios.post(API_URL + '/food', data);
    return response;
}

const deleteData = async (id: number): Promise<any> => {
    const response = await axios.delete(`${API_URL}/food/${id}`);
    return response;
  }

export function useFoodDataMutate(){
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['food-data'])
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['food-data'])
        }
    });

    return mutate;
}
