import { AxiosRequestConfig, AxiosResponse } from "axios";
import useAuthentication from "./useAuthentication"
import { useMutation, useQueryClient } from "react-query";

export type ApiConfig<TResponse> = {
    onSuccess?: (data?: TResponse) => void,
    onError?: (e: Error) => boolean,
    resetQueries?: boolean
}

export const useAuthenticatedMutation = <TRequest, TResponse>(
    mutationFn: (request: TRequest, options: AxiosRequestConfig) => Promise<AxiosResponse<TResponse>>,
    keys: string[],
    options?: ApiConfig<TResponse>) => {
    const { getAccessTokenAsync } = useAuthentication();
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async (request: TRequest) => {
            const token = await getAccessTokenAsync();
            return await mutationFn(request, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            });
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: [...keys] });
            if (options?.resetQueries) {
                // This has to be done in order for the infinite query to refresh properly on mount.
                await queryClient.resetQueries(keys);
            }
            options?.onSuccess && options.onSuccess(data?.data);
        },
        onError: (error) => {
            options?.onError && options.onError(error as Error);
        }
    });

    return mutation;
}
