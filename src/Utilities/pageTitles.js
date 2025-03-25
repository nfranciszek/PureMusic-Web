import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function usePageTitle(pageTitle) {
  const location = useLocation();

  useEffect(() => {
    document.title = `PureMusic · ${pageTitle}`;
  }, [pageTitle, location.pathname]);
}