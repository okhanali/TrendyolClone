import { FC } from 'react';
import WidgetSlider from './WidgetSlider';
import { WIDGET_ITEMS } from '@/constants';

const Widget: FC = async () => {
  const widgetImages = WIDGET_ITEMS;

  return (
    <section className="w-full">
      <WidgetSlider items={widgetImages} />
    </section>
  );
};

export default Widget;
