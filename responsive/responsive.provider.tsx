import { useEffect, useMemo, useState } from 'react';

import { defaultBreakpoints } from './responsive.config';
import { ResponsiveContext } from './responsive.context';
import { getResponsiveMap, initScreenMap } from './responsive.helper';
import type {
  Breakpoint,
  MatchHandlers,
  ResponsiveProviderProps,
  ScreenMap,
} from './responsive.type';

function ResponsiveProvider({ value, children }: ResponsiveProviderProps) {
  const defaultScreenSize = value ?? defaultBreakpoints;

  const [screens, setScreens] = useState<ScreenMap>(() =>
    initScreenMap(value ?? defaultBreakpoints),
  );

  const responsiveMap = useMemo(
    () => getResponsiveMap(defaultScreenSize),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(defaultScreenSize)],
  );

  useEffect(() => {
    const matchHandlers = {} as MatchHandlers;

    Object.entries(responsiveMap).forEach(([curScreen, mediaQuery]) => {
      const mql = window.matchMedia(mediaQuery);
      const handler = ({ matches }: { matches: boolean }) => {
        setScreens((prevScreen) => ({ ...prevScreen, [curScreen]: matches }));
      };

      mql.addEventListener('change', handler);
      matchHandlers[curScreen as Breakpoint] = {
        mql,
        handler,
      };
      handler(mql);
    });

    return () => {
      Object.keys(responsiveMap).forEach((curScreen) => {
        const handler = matchHandlers[curScreen as Breakpoint];
        if (handler) handler.mql.removeEventListener('change', handler.handler);
      });
    };
  }, [responsiveMap]);

  return (
    <ResponsiveContext.Provider value={screens}>
      {children}
    </ResponsiveContext.Provider>
  );
}

export default ResponsiveProvider;
