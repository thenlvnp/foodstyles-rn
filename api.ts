import { request } from "graphql-request";
import useSWR from "swr";

export const fetcher = (query: string, headers?: HeadersInit) =>
    request(
        "https://api-dev.foodstyles.com/graphql",
        query,
        undefined,
        headers
    );

export const useGet = (query: string) => {
    return useSWR(`${query}`, fetcher);
};
