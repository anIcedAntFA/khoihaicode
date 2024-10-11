import { createContext } from 'react';

import type { ResponsiveContextState } from './responsive.type';

export const ResponsiveContext = createContext<ResponsiveContextState | null>(
  null,
);
