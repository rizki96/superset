import { SuperChart, getChartTransformPropsRegistry } from '@superset-ui/core';
import {
  EchartsTimeseriesDabbleBarChartPlugin,
  TimeseriesTransformProps,
} from '@superset-ui/plugin-chart-echarts';
import stackWithNullsData from './stackWithNulls';
import { withResizableChartDemo } from '../../../../shared/components/ResizableChartDemo';

new EchartsTimeseriesDabbleBarChartPlugin()
  .configure({ key: 'echarts-dabble-bar-timeseries' })
  .register();

getChartTransformPropsRegistry().registerValue(
  'echarts-dabble-bar-timeseries',
  TimeseriesTransformProps,
);

export default {
  title: 'Chart Plugins/plugin-chart-echarts/DabbleBarChart',
  decorators: [withResizableChartDemo],
};

export const StackWithNulls = (
  {
    stack,
    area,
    showExtraControls,
    orientation,
  }: {
    stack: boolean;
    area: boolean;
    showExtraControls: boolean;
    orientation: string;
  },
  { width, height }: { width: number; height: number },
) => (
  <SuperChart
    chartType="echarts-dabble-bar-timeseries"
    width={width}
    height={height}
    queriesData={[
      {
        data: stackWithNullsData,
        colnames: ['ds', '1', '2'],
        coltypes: [2, 0, 0],
      },
    ]}
    formData={{
      color_scheme: 'supersetColors',
      series_type: 'bar',
      stack,
      area,
      show_extra_controls: showExtraControls,
      orientation: orientation,
      x_axis_time_format: 'smart_date',
      x_axis: 'ds',
    }}
  />
);

StackWithNulls.args = {
  stack: true,
  area: true,
  showExtraControls: true,
  orientation: 'vertical',
};

StackWithNulls.argTypes = {
  stack: { control: 'boolean' },
  area: { control: 'boolean' },
  showExtraControls: { control: 'boolean' },
  orientation: { control: 'select', options: ['vertical', 'horizontal'] },
};
