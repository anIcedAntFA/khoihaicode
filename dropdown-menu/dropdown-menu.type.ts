import type { Placement, triggerModes } from '@/types/constants';

export type DropdownMenuStyleProps = {
  mode: triggerModes;
  placement: Placement;
  offset: number;
  hasCloseOnSelect: boolean;
};
