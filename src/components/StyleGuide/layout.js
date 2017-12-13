import styled from 'react-emotion';
import { mediaMinWidth } from './helpers';

export const AppContainer = styled('div')(({ theme }) => ({
  'background-color': theme.colors.primary,
  'min-height': '100vh',
  'padding-top': theme.row
}));

export const PageBlock = styled('div')(
  {
    width: '100%'
  },
  ({ theme }) =>
    mediaMinWidth(theme.largeDevice, {
      width: 840,
      margin: 'auto'
    })
);

export const Card = styled('div')(({ theme }) => ({
  padding: theme.row * 2,
  'background-color': '#fff',
  'border-radius': 3,
  'box-shadow': '0px 2px 4px rgba(0,0,0,0.18)'
}));

export const Row = styled('div')(
  ({ justify = 'space-between', align = 'flex-start' }) => ({
    display: 'flex',
    'justify-content': justify,
    'align-items': align
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
