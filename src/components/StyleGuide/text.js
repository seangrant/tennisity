import styled from 'react-emotion';
import basekick from 'basekick';

const textHierarchy = {
  standard: {
    size: 1.6,
    rows: 3
  },
  subheading: {
    size: 2.1,
    rows: 4
  },
  heading: {
    size: 2.4,
    rows: 5
  },
  hero: {
    size: 4.2,
    rows: 6
  }
};

export const textTheme = {
  baseFontSize: 10,
  descenderHeightScale: 0.1365,
  fontFamily:
    'Roboto, "Helvetica Neue", HelveticaNeue, Helvetica, Arial, sans-serif',
  ...textHierarchy
};

const getTextType = ({ text }, type) =>
  text[type] ? text[type] : text.standard;

export const Text = styled('span')(
  {
    display: 'block'
  },
  ({ theme, type }) => ({
    ...basekick({
      typeSizeModifier: getTextType(theme, type).size,
      typeRowSpan: getTextType(theme, type).rows,
      descenderHeightScale: theme.text.descenderHeightScale,
      baseFontSize: theme.text.baseFontSize,
      gridRowHeight: theme.row
    })
  }),
  ({ theme, margin = true }) =>
    margin
      ? {
          'margin-bottom': theme.row * 2
        }
      : {},
  ({ centered = false }) =>
    centered
      ? {
          'text-align': 'center'
        }
      : {},
  ({ raw = false }) =>
    raw
      ? {
          transform: 'none',
          'margin-bottom': 0
        }
      : {},
  ({ strong = false }) =>
    strong
      ? {
          'font-weight': 'bold'
        }
      : {},
  ({ theme, light }) => ({
    color: light ? theme.colors.light : theme.colors.dark,
    '*': {
      color: light ? theme.colors.light : theme.colors.dark
    }
  }),
  ({ color }) => (color ? { color } : {})
);

export const Secondary = styled(Text)(({ theme }) => ({
  color: theme.colors.greys[0]
}));

export const Link = styled(Text)(({ theme }) => ({
  color: `${theme.colors.light} !important`
}));
