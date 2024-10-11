import type { ComponentProps } from 'react';

import { triggerModes } from '@/configs/constants';
import callAllHandlers from '@/utils/call-all-handler';
import { cn } from '@/utils/cn';

import useDropdownMenuContext from '../dropdown-menu.hook';

import styles from '../dropdown-menu.module.scss';

type DropdownMenuTriggerProps = ComponentProps<'button'>;

function DropdownMenuTrigger({
  className,
  children,
  onClick,
  ...buttonProps
}: DropdownMenuTriggerProps) {
  const { mode, isOpened, triggerRef, onToggle } = useDropdownMenuContext();

  const handleClick = () => {
    if (mode === triggerModes.CLICK && onToggle) {
      onToggle();
    }
  };

  return (
    <button
      ref={triggerRef}
      type='button'
      aria-label='Options'
      aria-expanded={isOpened}
      aria-haspopup='menu'
      className={cn(styles['dropdown-menu-trigger'], className)}
      onClick={callAllHandlers(onClick, handleClick)}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export default DropdownMenuTrigger;
