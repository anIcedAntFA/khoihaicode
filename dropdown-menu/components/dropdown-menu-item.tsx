import type { ComponentProps } from 'react';

import callAllHandlers from '@/utils/call-all-handler';
import { cn } from '@/utils/cn';

import useDropdownMenuContext from '../dropdown-menu.hook';

import styles from '../dropdown-menu.module.scss';

type DropdownMenuItemProps = ComponentProps<'button'>;

function DropdownMenuItem({
  className,
  children,
  onClick,
  ...buttonProps
}: DropdownMenuItemProps) {
  const { hasCloseOnSelect, onClose } = useDropdownMenuContext();

  const handleClick = () => {
    if (hasCloseOnSelect) onClose();
  };

  return (
    <li role='menuitem'>
      <button
        type='button'
        className={cn(styles['dropdown-menu-item'], className)}
        onClick={callAllHandlers(onClick, handleClick)}
        {...buttonProps}
      >
        {children}
      </button>
    </li>
  );
}

export default DropdownMenuItem;
