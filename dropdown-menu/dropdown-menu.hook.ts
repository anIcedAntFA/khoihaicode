import { useContext } from 'react';

import { DropdownMenuContext } from './dropdown-menu.context';

function useDropdownMenuContext() {
  const dropdownMenuContext = useContext(DropdownMenuContext);

  if (!dropdownMenuContext) {
    throw new Error(
      'useDropdownMenuContext must be used within a DropdownMenuProvider',
    );
  }

  return dropdownMenuContext;
}

export default useDropdownMenuContext;
