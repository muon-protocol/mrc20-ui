import React, { useMemo } from 'react'
import { createGlobalStyle, css, DefaultTheme, ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'

import { useIsDarkMode } from 'state/user/hooks'
import { Colors, Shadows } from './styled'
import { useRouter } from 'next/router'

export const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
  upToExtraLarge: 1600,
}

export enum Z_INDEX {
  deprecated_zero = 0,
  deprecated_content = 1,
  dropdown = 1000,
  sticky = 1020,
  fixed = 1030,
  modalBackdrop = 1040,
  modal = 1060,
  popover = 1570,
  tooltip = 1580,
}

const mediaWidthTemplates = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ; (accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any

const white = '#FFFFFF'
const black = '#000000'

export enum SupportedThemes {
  LIGHT = 'light',
  DARK = 'dark',
}

function colors() {
  // define color scheme for each supported theme
  const themeColors = {
    [SupportedThemes.DARK]: {
      themeName: SupportedThemes.DARK,

      // base
      white,
      black,

      // text
      text0: '#EBEBEC',
      text1: '#C1C8CE',
      text2: '#858C90',
      text3: '#60686E',
      text4: '#5F606F',
      text5: '#333344',
      textWarning: '#A54820',
      textWarning2: '#BC942D',
      blackDisable: '#2B3135',
      darkSecondary: '#475262',
      lightSecondary: '#EBEBEF',

      // these colors aren't for monolith
      text6: '#dce7eb',

      // backgrounds / greys
      bg: '#202122',
      bg0: '#1D1E21',
      bg1: '#222325',
      bg2: '#27292C',
      bg3: '#2F3032',
      bg4: '#35363A',
      bg5: '#444549',
      bg6: '#4F5055',
      bg7: '#55575E',
      bg8: '#323847',
      bg01: '#07090C',
      bgDark: '#121315',

      bgWarning: '#252121',
      bgWarning2: '#383528',

      bgGrad: 'linear-gradient(90deg, #161617 0.14%, #1A1B1C 48.96%, #131314 99.86%)',
      bgInput: 'linear-gradient(90deg, #36383C 0%, #1D1E21 100%)',

      bgError: '#381C1C',
      redError: '#BC2D36',
      // borders
      border1: '#343940',
      border2: '#2E3039',
      border3: '#232D33',

      // stroke
      stroke0: '#343940',
      stroke1: '#2E3039',
      stroke2: '#232D33',
      stroke3: '#343F46',
      strokeNile:
        'linear-gradient(122.97deg, rgba(45, 181, 188, 0.06) 0%, rgba(45, 181, 188, 0.71) 48.44%, rgba(45, 181, 188, 0) 100%)',

      nileSecondary: '#7DB0BC',
      nileDark: '#475968',
      nileLight: '#EBEBEF',
      nileBlack: '#1C3238',
      nileDeepBlack: '#13161A',
      nileGrad: 'linear-gradient(123deg, #3E4648 0%, #88A3A6 100%)',

      //gradient colors
      gradLight: 'linear-gradient(90deg, #E5EFF3 0%, #A2D4EA 50%, #E5EFF3 100%)',
      gradWarning: 'linear-gradient(90deg, #383528 0%, #080A0D 100%)',
      gradTreasure: 'linear-gradient(90deg, #F7F6D6 0%, #F7D398 33.85%, #A6E7EC 66.15%, #DAFBFD 100%)',
      gradEmpire: 'linear-gradient(90deg, #F7F6D6 0%, #DFFFF2 33.85%, #A6E7EC 66.15%, #DAFBFD 100%)',

      // primary colors
      primary0: '#EAB763',
      primary1: '#F2D29B',
      primaryDisable: '#8C877F',
      primaryRam: '#C6FAFD',
      primaryRamDisable: '#8C877F',
      primaryRamLight: '#FDFBF7',
      primaryRamDark: '#5C838F',

      // other
      red1: '#EA5E5E',
      red2: '#F82D3A',
      red3: '#D60000',

      green1: '#7DD485',

      error: '#BC2D36',
      warning: '#DCAB2E',

      //these colors aren't for monolith
      secondary1: '#1749FA',
      secondary2: 'rgba(23, 73, 250, 0.2)',
      yellow1: '#E3A507',
      yellow2: '#FF8F00',
      blue1: '#2172E5',
      blue2: '#AEE3FA',
      darkOrange: '#381C1C',
    },
  }
  // default the theme to light mode
  return themeColors[SupportedThemes.DARK]
}


function theme(themeName) {
  return {
    ...colors(),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    //shadows
    ...shadows(themeName),

    // media queries
    mediaWidth: mediaWidthTemplates,
  }
}

export default function ThemeProvider({ children }) {
  // get theme name from url if any
  const router = useRouter()
  const parsed = router.query?.theme
  const parsedTheme = parsed && typeof parsed === 'string' ? parsed : undefined

  const darkMode = useIsDarkMode()

  let themeName: SupportedThemes
  if (parsedTheme && Object.values(SupportedThemes).some((theme: string) => theme === parsedTheme)) {
    themeName = parsedTheme as SupportedThemes
  } else {
    themeName = darkMode ? SupportedThemes.DARK : SupportedThemes.LIGHT
  }

  const themeObject = useMemo(() => theme(themeName), [themeName])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

export const ThemedGlobalStyle = createGlobalStyle`

  @font-face {
    font-family: "Digital Numbers";
    src: url('./static/fonts/digital/DigitalNumbers-Regular.woff2');
  }

  @font-face {
    font-family: "Inter";
    src: url('./static/fonts/inter/Inter.woff2');
  }

  html {
    color: ${({ theme }) => theme.text0};
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }
  a {
    color: ${({ theme }) => theme.text0}; 
  }

  * {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 400;
  }

  button {
    all: unset;
    cursor: pointer;
    padding: 0px;
  }

  *, *:before, *:after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  }

  * {
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    // overflow-y: hidden;
  }
  *::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  /* Firefox */
  input[type=number] {
    font-family: 'Ubuntu', sans-serif;
    -moz-appearance: textfield;
  }
  input::placeholder {
    color: ${({ theme }) => theme.text1}; 
  }
  
`