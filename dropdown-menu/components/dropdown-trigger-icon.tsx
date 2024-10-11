import type { MotionProps } from 'framer-motion';
import { motion } from 'framer-motion';
import type { ComponentProps } from 'react';

import ChevronDownIcon from '@/assets/svgs/chevron-down.svg?react';
import { cn } from '@/utils/cn';

import useDropdownMenuContext from '../dropdown-menu.hook';

import styles from '../dropdown-menu.module.scss';

type DropdownTriggerIconProps = ComponentProps<'span'> & MotionProps;

function DropdownTriggerIcon({
  className,
  children,
  ...spanProps
}: DropdownTriggerIconProps) {
  const { isOpened } = useDropdownMenuContext();

  return children ? (
    <motion.span
      className={cn(styles['dropdown-trigger-icon'], className)}
      {...spanProps}
    >
      {children}
    </motion.span>
  ) : (
    <motion.span
      initial={{ rotate: 0 }}
      animate={{ rotate: isOpened ? 180 : 0 }}
      exit={{ rotate: 0, transition: { duration: 0.05 } }}
      transition={{ ease: 'easeInOut', duration: 0.3 }}
      className={cn(styles['dropdown-trigger-icon'], className)}
      {...spanProps}
    >
      <ChevronDownIcon />
    </motion.span>
  );
}

export default DropdownTriggerIcon;
