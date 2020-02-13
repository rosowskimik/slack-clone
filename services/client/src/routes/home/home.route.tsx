import React from 'react';
import {
  StyledHeader,
  StyledTeams,
  StyledInput,
  // StyledChannels,
  StyledMessages,
  HomeStyles
} from './home.style';
import ChannelsSidebar from '../../components/channels-sidebar/channels-sidebar.component';

interface Props {}

const placeholderChannels = {
  teamName: 'Test Team',
  userName: 'Test User',
  channels: [
    { id: 1, name: 'Channel 1' },
    { id: 2, name: 'Channel 2' }
  ]
};

const Home: React.FC<Props> = () => {
  return (
    <HomeStyles>
      <StyledHeader />
      <StyledTeams />
      <ChannelsSidebar {...placeholderChannels} />
      <StyledMessages />
      <StyledInput />
    </HomeStyles>
  );
};

export default Home;
