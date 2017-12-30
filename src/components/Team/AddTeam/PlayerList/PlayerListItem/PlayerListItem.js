import React from 'react';
import PropTypes from 'prop-types';

import styled from 'react-emotion';
import { Field } from 'redux-form';

import { Text, Row, Column, FlexItem } from '../../../../StyleGuide';

const TableRow = styled(Row)(({ theme }) => ({
  'margin-bottom': theme.row * 2
}));

const PlayerListItem = ({ index, player }) => (
  <TableRow key={index}>
    <FlexItem grow="1">
      <Text type="subheading">{index === 0 ? 'Captain' : index + 1}</Text>
    </FlexItem>
    <FlexItem grow="1">
      <Column>
        <Field name={`${player}.name`} basis="70px" component="input" />
      </Column>
    </FlexItem>
    <FlexItem>
      <Field name={`${player}.email`} basis="70px" component="input" />
    </FlexItem>
  </TableRow>
);

PlayerListItem.propTypes = {
  index: PropTypes.number.isRequired,
  player: PropTypes.shape({}).isRequired
};
export default PlayerListItem;
