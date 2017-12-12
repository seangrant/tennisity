import styled from 'react-emotion';
import basekick from 'basekick';

const colors = {
  primary: '#C7D408'
};

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
  }
};

const theme = {
  row: 6,
  largeDevice: '840',
  colors,
  text: {
    baseFontSize: 10,
    descenderHeightScale: 0.1365,
    fontFamily:
      'Roboto, "Helvetica Neue", HelveticaNeue, Helvetica, Arial, sans-serif',
    ...textHierarchy
  }
};

const getTextType = ({ text }, type) =>
  text[type] ? text[type] : text.standard;

const media = selector => (width, styles) => ({
  [`@media(${selector}: ${width}px)`]: styles
});
const mediaMinWidth = media('min-width');

export const Card = styled('div')({
  padding: theme.row * 2,
  'background-color': '#fff',
  'border-radius': 3
});

export const PageBlock = styled('div')(
  {
    width: '100%'
  },
  mediaMinWidth(theme.largeDevice, {
    width: 840,
    margin: 'auto'
  })
);

export const AppContainer = styled('div')({
  'background-color': theme.colors.primary
});

export const Text = styled('span')(
  {
    'margin-bottom': theme.row * 2,
    display: 'block'
  },
  ({ type }) =>
    basekick({
      typeSizeModifier: getTextType(theme, type).size,
      typeRowSpan: getTextType(theme, type).rows,
      descenderHeightScale: theme.text.descenderHeightScale,
      baseFontSize: theme.text.baseFontSize,
      gridRowHeight: theme.row
    })
);

export const Row = styled('div')({
  display: 'flex',
  'justify-content': 'space-between'
});
