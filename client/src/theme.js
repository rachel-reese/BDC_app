export const tokensDark = { 
    primary: {
        100: "#d0d8de",
        200: "#a2b1bd",
        300: "#738a9b",
        400: "#45637a",
        500: "#163c59",
        600: "#123047",
        700: "#0d2435",
        800: "#091824",
        900: "#040c12"
    },

    green: {
        100: "#ebf4d8",
        200: "#d7e9b1",
        300: "#c4dd89",
        400: "#b0d262",
        500: "#9cc73b",
        600: "#7d9f2f",
        700: "#5e7723",
        800: "#3e5018",
        900: "#1f280c"
    },

    secondary: {
        100: "#dde9f5",
        200: "#bbd3eb",
        300: "#99bce1",
        400: "#77a6d7",
        500: "#5590cd",
        600: "#4473a4",
        700: "#33567b",
        800: "#223a52",
        900: "#111d29"
    },
};

function reverseTokens(tokensDark) {
    const reversedTokens = {};
    Object.entries(tokensDark).forEach(([key, val]) => {
      const keys = Object.keys(val);
      const values = Object.values(val);
      const length = keys.length;
      const reversedObj = {};
      for (let i = 0; i < length; i++) {
        reversedObj[keys[i]] = values[length - i - 1];
      }
      reversedTokens[key] = reversedObj;
    });
    return reversedTokens;
  }
  export const tokensLight = reverseTokens(tokensDark);
  
  // mui theme settings
  export const themeSettings = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              // palette values for dark mode
              primary: {
                ...tokensDark.primary,
                main: tokensDark.primary[400],
                light: tokensDark.primary[400],
              },
              secondary: {
                ...tokensDark.secondary,
                main: tokensDark.secondary[300],
              },
              neutral: {
                ...tokensDark.green,
                main: tokensDark.green[500],
              },
              background: {
                default: tokensDark.primary[600],
                alt: tokensDark.primary[500],
              },
            }
          : {
              // palette values for light mode
              primary: {
                ...tokensLight.primary,
                main: tokensDark.green[50],
                light: tokensDark.green[100],
              },
              secondary: {
                ...tokensLight.secondary,
                main: tokensDark.secondary[600],
                light: tokensDark.secondary[700],
              },
              neutral: {
                ...tokensLight.green,
                main: tokensDark.green[500],
              },
              background: {
                default: tokensDark.green[0],
                alt: tokensDark.green[50],
              },
            }),
      },
      typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 40,
        },
        h2: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 32,
        },
        h3: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 24,
        },
        h4: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 20,
        },
        h5: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 16,
        },
        h6: {
          fontFamily: ["Inter", "sans-serif"].join(","),
          fontSize: 14,
        },
      },
    };
  };
