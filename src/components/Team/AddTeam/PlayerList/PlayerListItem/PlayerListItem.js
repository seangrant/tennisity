import React from 'react';
import styled from 'react-emotion';
import { Field } from 'redux-form';

import { Text, Row, Column, FlexItem } from '../../../../StyleGuide';

const TableRow = styled(Row)(({ theme }) => ({
  'margin-bottom': theme.row * 2
}));

const PlayerListItem = ({ index, player }) => (
  <TableRow key={index}>
    <FlexItem grow="1">
      <Text type="subheading" margin={false}>
        {index === 0 ? 'Captain' : index + 1}
      </Text>
    </FlexItem>
    <FlexItem grow="1">
      <Column>
        <input type="text" margin basis="70px" value={player.name} />
      </Column>
    </FlexItem>
    <FlexItem>
      <Field
        type="text"
        basis="70px"
        margin={false}
        value={player.email}
        component="input"
      />
    </FlexItem>
  </TableRow>
);

export default PlayerListItem;
