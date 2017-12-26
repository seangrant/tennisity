import React from 'react';
import { graphql } from 'react-apollo';
import PlayerListItem from './PlayerListItem/PlayerListItem';

import PlayerQuery from './playerQuery';

const PlayerList = props => {
  const { players: { teamPlayers = [] }, teamId, fields } = props;

  console.log({ teamPlayers, fields });
  return (
    <div>
      {teamPlayers.map((player, index) => (
        <PlayerListItem key={index} player={player} index={index} />
      ))}
    </div>
  );
};

const playerQuery = graphql(PlayerQuery, {
  name: 'players',
  options: ({ teamId }) => ({
    variables: {
      teamId
    }
  })
});

export default playerQuery(PlayerList);
