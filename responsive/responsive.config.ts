import type { Breakpoint, ScreenSizeMap } from './responsive.type';

export const defaultBreakpoints: Readonly<ScreenSizeMap> = {
  xxs: 0, //* default screen that match for all screen size
  xs: 360,
  sm: 692,
  md: 991,
  lg: 1023,
  xl: 1199,
  xxl: 2500,
};

/**
 * we are responsive in mobile first so make sure that
 * responsiveArray are sorted in descending order
 * xxl > xl > lg > md > sm > xs > xxs
 */
export const responsiveArray: Breakpoint[] = [
  'xxs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'xxl',
];
