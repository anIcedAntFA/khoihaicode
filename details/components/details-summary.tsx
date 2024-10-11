import type { ComponentProps, KeyboardEvent, MouseEvent } from 'react';

import callAllHandlers from '@/utils/call-all-handler';
import { cn } from '@/utils/cn';

import useDetailsContext from '../details.hook';

import styles from '../details.module.scss';

type SummaryProps = ComponentProps<'summary'>;

function Summary({
  className,
  children,
  onClick,
  onKeyDown,
  ...summaryProps
}: SummaryProps) {
  const { onToggle } = useDetailsContext();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onToggle();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <summary
      role='button'
      tabIndex={0}
      className={cn(styles['details-summary'], className)}
      onClick={callAllHandlers(onClick, handleClick)}
      onKeyDown={callAllHandlers(onKeyDown, handleKeyDown)}
      {...summaryProps}
    >
      {children}
    </summary>
  );
}

export default Summary;
