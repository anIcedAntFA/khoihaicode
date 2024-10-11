import type { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

import Collapse from '../../collapse';
import useDetailsContext from '../details.hook';

import styles from '../details.module.scss';

type DetailsContentProps = ComponentProps<'div'>;

function DetailsContent({
  className,
  children,
  ...divProps
}: DetailsContentProps) {
  const { isOpened } = useDetailsContext();

  return (
    <Collapse isOpened={isOpened}>
      <div className={cn(styles['details-content'], className)} {...divProps}>
        {children}
      </div>
    </Collapse>
  );
}

export default DetailsContent;
