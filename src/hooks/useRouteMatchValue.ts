import { useMemo } from 'react';

export const useRouteMatchValue = (pathname: string) => {
  return useMemo(() => {
    if (pathname.includes('create-meeting')) return 'create-meeting';
    if (pathname.includes('my-meetings')) return 'my-meetings';
    if (pathname.includes('profile')) return 'profile';
    if (pathname.includes('about')) return 'about';
    return '';
  }, [pathname]);
};
