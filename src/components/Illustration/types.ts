import type { IllustrationSvgProps } from "./components/types";

export type IllustrationPropTypes = {
  name: IllustrationList;
} & IllustrationSvgProps

export type IllustrationList =
  | 'dress'
  | 'location'
  | 'gift'
  | 'music';