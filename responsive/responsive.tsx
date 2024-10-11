import type { ReactNode } from 'react';

import { responsiveArray } from './responsive.config';
import { useResponsive } from './responsive.hook';
import type { Breakpoint } from './responsive.type';

type ResponsiveProps = Partial<Record<Breakpoint, ReactNode>>;

export function Responsive(props: ResponsiveProps) {
  const screens = useResponsive();
  const curScreen = responsiveArray.find(
    (curScreen) => screens[curScreen] && props[curScreen] !== undefined,
  );

  return curScreen ? props[curScreen] : null;
}
