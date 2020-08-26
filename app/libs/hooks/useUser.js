import useSWR from 'swr';
import { getInfo } from '../apis/auth.api';

export const SWR_KEY_USER = 'user';

export default () => {
  const { data: user, error, mutate } = useSWR(SWR_KEY_USER, getInfo, {
    initialData: null,
    revalidateOnFocus: false,
    refreshInterval: 0,
    shouldRetryOnError: false,
    revalidateOnMount: false,
    errorRetryCount: 3,
    errorRetryInterval: 15000,
    focusThrottleInterval: 5000,
  });
  const isAuthenticated = !error && user != null;
  const isLoading = !user && !error;

  return {
    isAuthenticated,
    isLoading,
    user,
    getUser: mutate,
  };
};
