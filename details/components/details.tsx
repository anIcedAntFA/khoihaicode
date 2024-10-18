import type { ComponentProps } from 'react';

import useDelayedState from '@/hooks/use-delayed-state';
import { cn } from '@/utils/cn';

import { DetailsProvider } from '../details.context';

import styles from '../details.module.scss';

type DetailsProps = ComponentProps<'details'> & {
  isOpened: boolean;
  onToggle: VoidFunction;
};

const TIMEOUT_DELAY = 300;

function Details({
  isOpened,
  className,
  children,
  onToggle,
  ...detailsProps
}: DetailsProps) {
  //* To animate the close animation we have to delay the DOM node state here.
  const isDelayedOpen = useDelayedState(isOpened, TIMEOUT_DELAY);

  const contextValue = {
    isOpened,
    onToggle,
  };

  return (
    <DetailsProvider value={contextValue}>
      <details
        open={isDelayedOpen}
        className={cn(styles.details, className)}
        data-expanded={isOpened}
        {...detailsProps}
      >
        {children}
      </details>
    </DetailsProvider>
  );
}

export default Details;
