import { eachDeep } from 'deepdash-es/standalone';
import { get, isPlainObject, isString, set, size } from 'lodash-es';

export const handleCallbackFunctions = (chartData) => {
  eachDeep(chartData, (val, _, __, { path }) => {
    if (
      isPlainObject(val) &&
      size(val) == 2 &&
      isString(get(val, 'arguments')) &&
      isString(get(val, 'body'))
    ) {
      set(
        chartData,
        `${path}`,
        new Function(get(val, 'arguments'), get(val, 'body'))
      );
    }
  });

  return chartData;
};
