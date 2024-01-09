import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise, AxiosResponse } from "axios"
import { FoodData } from '../interface/FoodData';

const API_URL = 'http://localhost:8080';

const fetchData = async (): AxiosPromise<FoodData[]> => {
    const response = await axios.get(API_URL + '/food'); // URL da API mais o endpoint food
    const modifiedResponse: AxiosResponse<FoodData[]> = {
      ...response,
      data: response.data.map((foodData: FoodData) => {
        return { ...foodData, recipe: '' }; 
      }),
    };
    return modifiedResponse;
  };

export function useFoodData(){
    const query = useQuery({ //Organiza como vai ser feita busca no banco de dados
        queryFn: fetchData, //Função que faz a busca dos dados
        queryKey: ['food-data'], //Padrão dos dados
        retry: 2 //Tentativas
    })

    return {
        ...query,
        data: query.data?.data
    }
}