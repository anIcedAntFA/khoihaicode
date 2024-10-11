import type { Meta, StoryObj } from '@storybook/react';

import Details from '../components/details';
import useBoolean from '@/hooks/use-boolean';
import DetailsSummaryIcon from '../components/details-summary-icon';
import DetailsSummary from '../components/details-summary';
import DetailsContent from '../components/details-content';
import PlusIcon from '@/assets/svgs/plus.svg?react';

const meta: Meta = {
  title: 'Common/Details',
  component: Details,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpened: {
      name: 'Is Opened',
      description: 'Is details opened',
      defaultValue: false,
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Details>;

export default meta;

type Story = StoryObj<typeof Details>;

export const Default: Story = {
  render: () => {
    const expanded = useBoolean(false);

    return (
      <Details
        isOpened={expanded.value}
        className='w-48'
        onToggle={expanded.toggle}
      >
        <DetailsSummary className='p-1'>
          <h4>프로그램</h4>
          <DetailsSummaryIcon className='ml-2' />
        </DetailsSummary>
        <DetailsContent className='p-1'>
          <ul className='flex flex-col gap-1'>
            <li>멀리보는 교육</li>
            <li>특별한 보육</li>
            <li>학부모 지원</li>
            <li>가정연계</li>
          </ul>
        </DetailsContent>
      </Details>
    );
  },
};

export const WithCustomSummaryIcon: Story = {
  render: () => {
    const expanded = useBoolean(false);

    return (
      <Details
        isOpened={expanded.value}
        className='w-80'
        onToggle={expanded.toggle}
      >
        <DetailsSummary className='p-1'>
          <DetailsSummaryIcon
            initial={{ rotate: 0 }}
            animate={{ rotate: expanded.value ? 135 : 0 }}
            exit={{ rotate: 0, transition: { duration: 0.05 } }}
            transition={{ ease: 'easeInOut', duration: 0.3 }}
            className='mr-2'
          >
            <PlusIcon />
          </DetailsSummaryIcon>
          <h4>Custom Icon</h4>
        </DetailsSummary>
        <DetailsContent className='p-1'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
          voluptatibus quod iusto adipisci fugit, debitis a at voluptas tempore
          saepe reiciendis facilis praesentium maxime iste obcaecati illum
          inventore unde eaque?
        </DetailsContent>
      </Details>
    );
  },
};
