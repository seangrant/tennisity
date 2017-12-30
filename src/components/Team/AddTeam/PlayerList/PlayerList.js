import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import PlayerListItem from './PlayerListItem/PlayerListItem';

import PlayerQuery from './playerQuery';

class PlayerList extends Component {
  static propTypes = {
    teamId: PropTypes.string.isRequired,
    players: PropTypes.shape({}).isRequired,
    fields: PropTypes.arrayOf({}).isRequired
  };
  componentWillReceiveProps = newProps => {
    const {
      teamId: currentTeam,
      players: { teamPlayers = [], refetch },
      fields
    } = this.props;
    const { teamId: newTeam } = newProps;
    if (teamPlayers) {
      teamPlayers.forEach((player, index) => {
        fields.remove(index);
        fields.push(player);
      });
    }
    if (currentTeam !== newTeam) {
      refetch({ teamId: newTeam });
    }
  };
  render() {
    const { fields } = this.props;

    return (
      <div>
        {fields.map((player, index) => (
          <PlayerListItem key={player} player={player} index={index} />
        ))}
      </div>
    );
  }
}

const playerQuery = graphql(PlayerQuery, {
  name: 'players',
  options: ({ teamId }) => ({
    variables: {
      teamId
    }
  })
});

export default playerQuery(PlayerList);
