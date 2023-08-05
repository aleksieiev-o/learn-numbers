import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

export enum EnumColorMode {
  LIGHT = 'light',
  DARK = 'dark',
}

const config: ThemeConfig = {
  initialColorMode: EnumColorMode.LIGHT,
  useSystemColorMode: true,
};

export const theme = extendTheme({ config });

export const tabletScreenWidth = 600;
