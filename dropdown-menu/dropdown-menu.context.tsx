import type { ElementRef, RefObject } from 'react';
import { createContext } from 'react';

import type { DropdownMenuStyleProps } from './dropdown-menu.type.ts';

type DropdownMenuContextState = DropdownMenuStyleProps & {
  isOpened: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  triggerRef: RefObject<ElementRef<'button'>>;
  onToggle?: VoidFunction;
};

export const DropdownMenuContext = createContext<
  DropdownMenuContextState | undefined
>(undefined);

export const DropdownMenuProvider = DropdownMenuContext.Provider;
