import useAuthentication from "./useAuthentication"
import { useMutation, useQueryClient } from "react-query";

export type ApiConfig<TResponse> = {
    onSuccess?: (data?: TResponse) => void,
    onError?: (e: Error) => boolean
}

export const useAuthenticatedMutation = <TRequest, TResponse>(
    url: string,
    fetcher: (url: string, request: TRequest, config: any) => Promise<TResponse>,
    keys: string[],
    options?: ApiConfig<TResponse>) => {
    const { getAccessTokenAsync } = useAuthentication();
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async (request: TRequest) => {
            try {
                const token = await getAccessTokenAsync();
                return await fetcher(url, request, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json, text/plain',
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                });
            } catch (error: unknown) {
                if (!(options?.onError && options.onError(error as Error))) {
                    throw error;
                }
            }
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [...keys] });
            options?.onSuccess && options.onSuccess(data);
        }
    });

    return mutation;
}
