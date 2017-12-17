import React from 'react';
import styled from 'react-emotion';
import withProps from 'recompose/withProps';

import {
  Card,
  Text,
  Row,
  Secondary,
  Column,
  FlexItem,
  Section,
  margin,
  border
} from '../../../../StyleGuide';

const TableRow = styled(Row)(({ theme }) => ({
  'margin-bottom': theme.row * 2
}));

const PlayerListItem = ({ index, player }) => (
    <TableRow key={player.id}>
      <FlexItem grow="1">
        <Text type="subheading" margin={false}>
          {index === 0 ? 'Captain' : index + 1}
        </Text>
      </FlexItem>
      <FlexItem grow="1">
        <Column>
          <Text type="subheading" margin={false}>
            {player.name}
          </Text>
        </Column>
      </FlexItem>
      <FlexItem align="center" basis="70px">
        <Text centered>{player.email}</Text>
      </FlexItem>
    </TableRow>
  );

export default PlayerListItem;
