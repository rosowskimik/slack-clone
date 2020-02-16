import React from 'react';
import {
  StyledHeader,
  StyledInput,
  StyledMessages,
  HomeStyles
} from './home.style';
import ChannelsSidebar from '../../components/channels-sidebar/channels-sidebar.component';
import TeamsSidebar from '../../components/teams-sidebar/teams-sidebar.component';

interface Props {}

const placeholderChannels = {
  teamName: 'Test Team',
  userName: 'Test User',
  channels: [
    { id: 1, name: 'Channel 1' },
    { id: 2, name: 'Channel 2' }
  ]
};

const placeholderTeams = [
  { id: 1, name: 'Team 1' },
  { id: 2, name: 'Hello' }
];

const Home: React.FC<Props> = () => {
  return (
    <HomeStyles>
      <StyledHeader />
      <TeamsSidebar teams={placeholderTeams} />
      <ChannelsSidebar {...placeholderChannels} />
      <StyledMessages />
      <StyledInput />
    </HomeStyles>
  );
};

export default Home;
