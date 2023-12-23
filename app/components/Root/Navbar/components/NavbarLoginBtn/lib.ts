import { useCallback, useEffect, useState } from 'react';

function useIsJsLoginButtonHidden() {
  const [isHidden, setIsHidden] = useState(true);
  useEffect(() => {
    setIsHidden(false);
  }, []);

  return isHidden;
}

function useDialogOpenHandler() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenChange = useCallback((newIsOpen: boolean) => {
    // setup close via interaction with modal
    if (!newIsOpen) {
      window.history.back(); // this automatically closes the modal
      return;
    }
    setIsOpen(true);
    window.history.pushState({}, '', '/login');

    // setup close via browser back button
    window.addEventListener('popstate', () => {
      if (window.location.pathname !== '/login') {
        setIsOpen(false);
      }
    }, { once: true });
  }, []);

  return [isOpen, handleOpenChange] as const;
}

export default { useIsJsLoginButtonHidden,
  useDialogOpenHandler };
