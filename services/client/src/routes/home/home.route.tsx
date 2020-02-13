import React from 'react';
import {
  StyledHeader,
  StyledTeams,
  StyledInput,
  StyledChannels,
  StyledMessages,
  HomeStyles
} from './home.style';

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <HomeStyles>
      <StyledHeader />
      <StyledTeams />
      <StyledChannels />
      <StyledMessages />
      <StyledInput />
    </HomeStyles>
  );
};

export default Home;
