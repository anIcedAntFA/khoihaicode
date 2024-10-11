import { useContext } from 'react';

import { responsiveArray } from './responsive.config';
import { ResponsiveContext } from './responsive.context';
import type { Breakpoint } from './responsive.type';

export function useResponsive() {
  const context = useContext(ResponsiveContext);

  if (!context) {
    throw new Error('useResponsive must be used within a ResponsiveProvider');
  }

  return context;
}

/**
 * useResponsiveProps hook
 * @param props
 * @returns responsive props
 * @example
 * ```tsx
 *  const selectListHeight = useResponsiveProps({
 *    xxs: 102,
 *    xxl: 150,
 *    xs: 128,
 *  });
 *
 *  const isSmallerDesktop = useResponsiveProps({
 *    lg: true,
 *  });
 * ```
 * */
export function useResponsiveProps<T>(props: Partial<Record<Breakpoint, T>>) {
  const screens = useResponsive();
  const curScreen = responsiveArray.find(
    (curScreen) => screens[curScreen] && props[curScreen] !== undefined,
  );

  return curScreen ? props[curScreen] : undefined;
}
