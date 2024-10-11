import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '@tanstack/react-router';

import useBoolean from '@/hooks/use-boolean';
import PlusIcon from '../../../../assets/svgs/plus.svg?react';
import DropdownMenu from '../components/dropdown-menu';
import DropdownMenuItem from '../components/dropdown-menu-item';
import DropdownMenuList from '../components/dropdown-menu-list';
import DropdownMenuTrigger from '../components/dropdown-menu-trigger';
import DropdownTriggerIcon from '../components/dropdown-trigger-icon';

const meta: Meta = {
  title: 'Common/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpened: {
      name: 'Is Opened',
      description: 'Is dropdown menu opened',
      defaultValue: false,
      control: 'boolean',
    },
    onOpen: {
      name: 'On Open',
      description: 'On open callback',
      action: 'onOpen',
    },
    onClose: {
      name: 'On Close',
      description: 'On close callback',
      action: 'onClose',
    },
    mode: {
      name: 'Mode',
      description: 'Dropdown menu mode',
      defaultValue: 'click',
      control: 'inline-radio',
      options: ['click', 'hover'],
    },
    placement: {
      name: 'Placement',
      description: 'Dropdown menu placement',
      defaultValue: 'bottom',
      control: 'inline-radio',
      options: ['top', 'bottom'],
    },
    offset: {
      name: 'Offset',
      description: 'Dropdown menu offset',
      defaultValue: 4,
      control: 'number',
    },
    hasDropdownIcon: {
      name: 'Has Dropdown Icon',
      description: 'Has dropdown icon',
      defaultValue: true,
      control: 'boolean',
    },
    hasCloseOnSelect: {
      name: 'Has Close On Select',
      description: 'Has close on select',
      defaultValue: true,
      control: 'boolean',
    },
    onToggle: {
      name: 'On Toggle',
      description: 'On toggle callback',
      action: 'onToggle',
    },
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const DropdownMenuWithClickMode: Story = {
  render: () => {
    const showMenu = useBoolean(false);

    return (
      <DropdownMenu
        isOpened={showMenu.value}
        onOpen={showMenu.on}
        onClose={showMenu.off}
      >
        <DropdownMenuTrigger onClick={showMenu.toggle}>
          도토리소풍
        </DropdownMenuTrigger>
        <DropdownMenuList>
          <DropdownMenuItem onClick={action('clicked 1')}>
            option 1
          </DropdownMenuItem>
          <DropdownMenuItem onClick={action('clicked 2')}>
            option 2
          </DropdownMenuItem>
          <DropdownMenuItem onClick={action('clicked 3')}>
            option 3
          </DropdownMenuItem>
        </DropdownMenuList>
      </DropdownMenu>
    );
  },
};

export const DropdownMenuWithHoverMode: Story = {
  render: () => {
    const showMenu = useBoolean(false);

    return (
      <DropdownMenu
        isOpened={showMenu.value}
        onOpen={showMenu.on}
        onClose={showMenu.off}
        mode='hover'
      >
        <DropdownMenuTrigger onClick={showMenu.toggle}>
          도토리소풍
        </DropdownMenuTrigger>
        <DropdownMenuList style={{ width: 160 }}>
          <DropdownMenuItem>
            <Link to='/acorn-picnic/intro'>도토리소풍 소개</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to='/acorn-picnic/footprints'>도토리소풍 발자국</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to='/acorn-picnic/news'>도토리소풍 소식</Link>
          </DropdownMenuItem>
        </DropdownMenuList>
      </DropdownMenu>
    );
  },
};

export const DropdownMenuWithCustomTriggerIcon: Story = {
  render: () => {
    const showMenu = useBoolean(false);

    return (
      <div style={{ display: 'flex' }}>
        <DropdownMenu
          isOpened={showMenu.value}
          onOpen={showMenu.on}
          onClose={showMenu.off}
          placement='top'
          offset={12}
          hasDropdownIcon={false}
          style={{ width: 240 }}
        >
          <DropdownMenuTrigger
            style={{
              justifyContent: 'space-between',
              width: '100%',
              borderBottom: '1px solid #ccc',
            }}
            onClick={showMenu.toggle}
          >
            Family Site
            <DropdownTriggerIcon
              initial={{ rotate: 0 }}
              animate={{ rotate: showMenu.value ? 135 : 0 }}
              exit={{ rotate: 0, transition: { duration: 0.05 } }}
              transition={{ ease: 'easeInOut', duration: 0.3 }}
            >
              <PlusIcon />
            </DropdownTriggerIcon>
          </DropdownMenuTrigger>
          <DropdownMenuList
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <DropdownMenuItem
              onClick={() =>
                window.open('https://borderless.nexonfoundation.org/')
              }
            >
              option 1
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                window.open('https://borderless.nexonfoundation.org/')
              }
            >
              option 2
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                window.open('https://borderless.nexonfoundation.org/')
              }
            >
              option 3
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                window.open('https://borderless.nexonfoundation.org/')
              }
            >
              option 4
            </DropdownMenuItem>
          </DropdownMenuList>
        </DropdownMenu>
      </div>
    );
  },
};
