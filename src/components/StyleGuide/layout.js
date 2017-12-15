import styled from 'react-emotion';
import { mediaMinWidth } from './helpers';

export const AppContainer = styled('div')(({ theme }) => ({
  'background-color': theme.colors.background,
  'min-height': '100vh'
}));

export const PageBlock = styled('div')(
  {
    width: '100%',
    height: '100%'
  },
  ({ theme }) =>
    mediaMinWidth(theme.largeDevice, {
      width: 840,
      margin: 'auto'
    })
);

export const Card = styled('div')({
  'background-color': '#fff',
  'border-radius': 3,
  'box-shadow': '0px 2px 4px rgba(0,0,0,0.18)',
  overflow: 'hidden'
});

export const Section = styled('div')(({ theme }) => ({
  padding: theme.row * 2,
  'border-radius': 'inherit',
  width: '100%'
}));

export const Row = styled('div')(
  ({ theme, justify = 'space-between', align = 'flex-start', rows }) => ({
    display: 'flex',
    'justify-content': justify,
    'align-items': align,
    height: rows ? rows * theme.row : 'auto'
  })
);

export const Column = styled('div')({
  display: 'flex',
  'justify-content': 'space-between',
  'flex-direction': 'column'
});

export const FlexItem = styled('div')(
  ({ grow = 0, shrink = 0, basis = 'auto', align = 'auto' }) => ({
    flex: `${grow} ${shrink} ${basis}`,
    'align-self': align
  })
);
