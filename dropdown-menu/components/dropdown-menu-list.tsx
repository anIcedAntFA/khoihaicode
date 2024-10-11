import type { MotionProps, MotionStyle } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { type ComponentProps, type ElementRef, useEffect, useRef } from 'react';

import { placements } from '@/configs/constants';
import useOutsideClick from '@/hooks/use-outside-click';
import type { Placement } from '@/types/constants';
import { cn } from '@/utils/cn';

import useDropdownMenuContext from '../dropdown-menu.hook';

import styles from '../dropdown-menu.module.scss';

type DropdownMenuListProps = ComponentProps<'ul'> & MotionProps;

function DropdownMenuList({
  className,
  style,
  children,
  ...divProps
}: DropdownMenuListProps) {
  const { isOpened, onClose, triggerRef, placement, offset } =
    useDropdownMenuContext();

  const listRef = useRef<ElementRef<'ul'>>(null);

  useOutsideClick({
    ref: listRef,
    handler: (event) => {
      const target = event.target as HTMLButtonElement;
      if (!triggerRef.current?.contains(target)) onClose();
    },
    isEnabled: isOpened,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const styleWithPlacements: Record<Placement, object> = {
    [placements.TOP]: {
      bottom: `calc(100% + ${offset}px)`,
      left: '50%',
      translate: '-50%',
    },
    [placements.BOTTOM]: {
      top: `calc(100% + ${offset}px)`,
      left: '50%',
      translateX: '-50%',
    },
  };

  return (
    <AnimatePresence>
      {isOpened && (
        <motion.ul
          ref={listRef}
          role='menu'
          aria-orientation='vertical'
          initial={{ opacity: 0, y: -offset }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, delay: 0.05 },
          }}
          exit={{
            opacity: 0,
            y: -offset,
            transition: { duration: 0.1, delay: 0.05 },
          }}
          transition={{ ease: 'easeInOut' }}
          className={cn(styles['dropdown-menu-list'], className)}
          data-placement={placement}
          data-offset={offset}
          style={
            {
              '--pseudo-top': `-${offset}px`,
              '--pseudo-bottom': `-${offset}px`,
              '--pseudo-height': `${offset}px`,
              ...styleWithPlacements[placement],
              ...style,
            } as unknown as MotionStyle
          }
          {...divProps}
        >
          {children}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}

export default DropdownMenuList;
