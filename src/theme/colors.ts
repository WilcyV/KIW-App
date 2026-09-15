export type ThemeKey = 'sage' | 'blue' | 'lavender' | 'warm' | 'slate' | 'dark';

export interface ThemeColors {
  bg: string;
  surface: string;
  surface2: string;
  border: string;
  text: string;
  text2: string;
  text3: string;
  accent: string;
  accentLight: string;
  accentText: string;
  header: string;
  headerText: string;
  star: string;
}

type ThemeVariants = { light: ThemeColors; dark: ThemeColors };

const THEMES: Record<ThemeKey, ThemeVariants> = {
  sage: {
    light: {
      bg: '#F0F5F0', surface: '#FFFFFF', surface2: '#E8F0E8',
      border: 'rgba(0,0,0,0.10)',
      text: '#1a2e1a', text2: '#4a6050', text3: '#7a9080',
      accent: '#3D7A56', accentLight: '#d4ead9', accentText: '#1a3d28',
      header: '#3D7A56', headerText: '#FFFFFF', star: '#E8C49A',
    },
    dark: {
      bg: '#141c18', surface: '#1e2820', surface2: '#253022',
      border: 'rgba(255,255,255,0.09)',
      text: '#e8f0e8', text2: '#9ab8a0', text3: '#5e7d65',
      accent: '#5BA373', accentLight: '#1a3d28', accentText: '#d4ead9',
      header: '#141c18', headerText: '#e8f0e8', star: '#E8C49A',
    },
  },
  blue: {
    light: {
      bg: '#EBF0F5', surface: '#FFFFFF', surface2: '#dce9f2',
      border: 'rgba(0,0,0,0.10)',
      text: '#1a2535', text2: '#3d5a78', text3: '#7a95b0',
      accent: '#4A7FA5', accentLight: '#D0E4F0', accentText: '#1a3550',
      header: '#4A7FA5', headerText: '#FFFFFF', star: '#E8C49A',
    },
    dark: {
      bg: '#111820', surface: '#192030', surface2: '#1f2a3a',
      border: 'rgba(255,255,255,0.08)',
      text: '#ddeeff', text2: '#89aac8', text3: '#4a7090',
      accent: '#6699BB', accentLight: '#1a3550', accentText: '#c8e2f5',
      header: '#111820', headerText: '#ddeeff', star: '#E8C49A',
    },
  },
  lavender: {
    light: {
      bg: '#F0EEF8', surface: '#FFFFFF', surface2: '#e4e0f8',
      border: 'rgba(0,0,0,0.10)',
      text: '#241e3a', text2: '#5a4e80', text3: '#9080b0',
      accent: '#7063A8', accentLight: '#E0DAF5', accentText: '#241e3a',
      header: '#7063A8', headerText: '#FFFFFF', star: '#E8C49A',
    },
    dark: {
      bg: '#140f25', surface: '#1e1835', surface2: '#261e40',
      border: 'rgba(255,255,255,0.08)',
      text: '#e8e0ff', text2: '#a090d0', text3: '#6050a0',
      accent: '#907FC8', accentLight: '#241e3a', accentText: '#ddd5ff',
      header: '#140f25', headerText: '#e8e0ff', star: '#E8C49A',
    },
  },
  warm: {
    light: {
      bg: '#FBF8F4', surface: '#FFFFFF', surface2: '#f5ede4',
      border: 'rgba(0,0,0,0.10)',
      text: '#2e2015', text2: '#6e5040', text3: '#b09080',
      accent: '#A0704A', accentLight: '#F5EDE4', accentText: '#2e2015',
      header: '#A0704A', headerText: '#F5EDE4', star: '#E8C49A',
    },
    dark: {
      bg: '#1a1008', surface: '#241810', surface2: '#2e2018',
      border: 'rgba(255,255,255,0.08)',
      text: '#f5e8d8', text2: '#c0986a', text3: '#805840',
      accent: '#C09070', accentLight: '#2e1a08', accentText: '#f0dcc8',
      header: '#1a1008', headerText: '#f5e8d8', star: '#E8C49A',
    },
  },
  slate: {
    light: {
      bg: '#ECEEF2', surface: '#FFFFFF', surface2: '#dde0ea',
      border: 'rgba(0,0,0,0.10)',
      text: '#1a1e28', text2: '#4a5065', text3: '#7a8098',
      accent: '#5A6480', accentLight: '#D8DCE8', accentText: '#1a1e28',
      header: '#5A6480', headerText: '#FFFFFF', star: '#E8C49A',
    },
    dark: {
      bg: '#0e1018', surface: '#161a28', surface2: '#1e2232',
      border: 'rgba(255,255,255,0.08)',
      text: '#dde0f0', text2: '#8890b0', text3: '#4a5070',
      accent: '#7A84A0', accentLight: '#1a1e30', accentText: '#d8dcea',
      header: '#0e1018', headerText: '#dde0f0', star: '#E8C49A',
    },
  },
  dark: {
    light: {
      bg: '#0D0D0D', surface: '#1A1A1A', surface2: '#242424',
      border: 'rgba(255,255,255,0.09)',
      text: '#F0F0F0', text2: '#909090', text3: '#555555',
      accent: '#C8F060', accentLight: '#1a2a00', accentText: '#0D0D0D',
      header: '#0D0D0D', headerText: '#F0F0F0', star: '#E8C49A',
    },
    dark: {
      bg: '#0D0D0D', surface: '#1A1A1A', surface2: '#242424',
      border: 'rgba(255,255,255,0.09)',
      text: '#F0F0F0', text2: '#909090', text3: '#555555',
      accent: '#C8F060', accentLight: '#1a2a00', accentText: '#0D0D0D',
      header: '#0D0D0D', headerText: '#F0F0F0', star: '#E8C49A',
    },
  },
};

export function getTheme(key: ThemeKey, isDark: boolean): ThemeColors {
  const theme = THEMES[key] ?? THEMES.sage;
  return isDark ? theme.dark : theme.light;
}

export { THEMES };
