import { useSWRConfig } from "swr"
import useAuthentication from "./useAuthentication"
import { useState } from "react"
import axios from "axios";

export type ApiConfig<TResponse> = {
    onSuccess?: (data: TResponse) => void,
    onError?: (e: Error) => boolean
}

export const useApi = <TRequest, TResponse>(url: string,
    resourceKeys: string[],
    options?: ApiConfig<TResponse>) => {

    const { getAccessTokenAsync } = useAuthentication();
    const { mutate } = useSWRConfig();
    const [error, setError] = useState<Error | undefined>();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<TResponse | null>();

    const api = (requestHandler: (url: string, request: TRequest, config: any) => Promise<TResponse>) =>
        async (request: TRequest) => {
            try {
                setLoading(true);
                setData(null);
                const token = await getAccessTokenAsync();

                const response = await requestHandler(url, request, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json, text/plain',
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                })

                setData(response);
                setError(undefined);
                mutate(resourceKeys);
            } catch (e: unknown) {
                if (!(options?.onError && options.onError(e as Error))) {
                    setError(e as Error)
                }
            } finally {
                setLoading(false);
            }
        }

    const post = api(async (url, request, config) => {
        const response = await axios.post(url, request, config);
        return response.data as TResponse;
    })

    return { post, error, loading, data }
}
