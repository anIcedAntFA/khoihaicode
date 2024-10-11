import { type ComponentProps, type ElementRef, useRef } from 'react';

import { placements, triggerModes } from '@/configs/constants';
import callAllHandlers from '@/utils/call-all-handler';
import { cn } from '@/utils/cn';

import { DropdownMenuProvider } from '../dropdown-menu.context';
import type { DropdownMenuStyleProps } from '../dropdown-menu.type';

import styles from '../dropdown-menu.module.scss';

type DropdownMenuProps = ComponentProps<'div'> &
  Partial<DropdownMenuStyleProps> & {
    isOpened: boolean;
    onOpen: VoidFunction;
    onClose: VoidFunction;
    onToggle?: VoidFunction;
  };

function DropdownMenu({
  isOpened,
  onOpen,
  onClose,
  mode = triggerModes.CLICK,
  placement = placements.BOTTOM,
  offset = 0,
  hasCloseOnSelect = true,
  onToggle,
  onMouseEnter,
  onMouseLeave,
  className,
  children,
  ...divProps
}: DropdownMenuProps) {
  const triggerRef = useRef<ElementRef<'button'>>(null);

  const contextValue = {
    mode,
    placement,
    offset,
    isOpened,
    hasCloseOnSelect,
    triggerRef,
    onOpen,
    onToggle,
    onClose,
  };

  const handleMouseEnter = () => {
    if (mode === triggerModes.HOVER) onOpen();
  };

  const handleMouseLeave = () => {
    if (mode === triggerModes.HOVER && onClose) {
      onClose();
    }
  };

  return (
    <DropdownMenuProvider value={contextValue}>
      <div
        className={cn(styles['dropdown-menu'], className)}
        onMouseEnter={callAllHandlers(onMouseEnter, handleMouseEnter)}
        onMouseLeave={callAllHandlers(onMouseLeave, handleMouseLeave)}
        {...divProps}
      >
        {children}
      </div>
    </DropdownMenuProvider>
  );
}

export default DropdownMenu;
