import { motion, type MotionProps } from 'framer-motion';
import type { ComponentProps } from 'react';

import ChevronDownIcon from '@/assets/svgs/chevron-down.svg?react';
import { cn } from '@/utils/cn';

import useDetailsContext from '../details.hook';

import styles from '../details.module.scss';

type DetailsSummaryIconProps = ComponentProps<'span'> & MotionProps;

function DetailsSummaryIcon({
  className,
  children,
  ...spanProps
}: DetailsSummaryIconProps) {
  const { isOpened } = useDetailsContext();

  return children ? (
    <motion.span
      className={cn(styles['summary-icon'], className)}
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
      className={cn([styles['summary-icon'], className])}
      {...spanProps}
    >
      <ChevronDownIcon />
    </motion.span>
  );
}

export default DetailsSummaryIcon;
