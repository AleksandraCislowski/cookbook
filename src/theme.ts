import { alpha, createTheme } from "@mui/material/styles";

const headingFontFamily =
  'var(--font-heading), "Fraunces", Georgia, "Times New Roman", serif';
const bodyFontFamily =
  'var(--font-body), "DM Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export const appColors = {
  ink: "#172033",
  mutedInk: "#5F687A",
  blue: "#2563A9",
  blueDark: "#173F75",
  blueLight: "#D7E8FA",
  sky: "#6BAED6",
  mint: "#79BFA8",
  tomato: "#C85A4A",
  saffron: "#E4A72F",
  paper: "#FFFDF8",
  background: "#F3F7FA",
  surface: "#EAF1F6",
  border: "#D8E1EA",
  imageFallback: "#D7E8FA",
  note: "#FFF4D8",
} as const;

declare module "@mui/material/styles" {
  interface Palette {
    app: {
      border: string;
      imageFallback: string;
      note: string;
      surface: string;
    };
  }

  interface PaletteOptions {
    app?: {
      border?: string;
      imageFallback?: string;
      note?: string;
      surface?: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: appColors.blue,
      dark: appColors.blueDark,
      light: appColors.blueLight,
      contrastText: appColors.paper,
    },
    secondary: {
      main: appColors.mint,
      light: appColors.sky,
      contrastText: appColors.ink,
    },
    background: {
      default: appColors.background,
      paper: appColors.paper,
    },
    text: {
      primary: appColors.ink,
      secondary: appColors.mutedInk,
    },
    warning: {
      main: appColors.saffron,
      contrastText: appColors.ink,
    },
    error: {
      main: appColors.tomato,
    },
    divider: appColors.border,
    app: {
      border: appColors.border,
      imageFallback: appColors.imageFallback,
      note: appColors.note,
      surface: appColors.surface,
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: bodyFontFamily,
    h1: {
      fontFamily: headingFontFamily,
      fontWeight: 800,
      letterSpacing: 0,
    },
    h2: {
      fontFamily: headingFontFamily,
      fontWeight: 800,
      letterSpacing: 0,
    },
    h3: {
      fontFamily: headingFontFamily,
      fontWeight: 700,
      letterSpacing: 0,
    },
    h4: {
      fontFamily: headingFontFamily,
      fontWeight: 700,
      letterSpacing: 0,
    },
    h5: {
      fontFamily: headingFontFamily,
      fontWeight: 700,
      letterSpacing: 0,
    },
    h6: {
      fontFamily: headingFontFamily,
      fontWeight: 700,
      letterSpacing: 0,
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        :root {
          background: ${appColors.background};
        }

        body {
          background: linear-gradient(180deg, ${alpha(appColors.background, 0.96)}, ${alpha(
            appColors.surface,
            0.94,
          )}), ${appColors.background};
          color: ${appColors.ink};
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});
