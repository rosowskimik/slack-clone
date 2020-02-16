import React from 'react';
import { TeamsWrapper, TeamsList as TeamsListEl } from './teams-sidebar.style';

interface Props {
  teams: { id: number | string; name: string }[];
}

const TeamsSidebar: React.FC<Props> = ({ teams }) => {
  return (
    <TeamsWrapper>
      {teams.map(team => (
        <TeamsListEl key={team.id}>{team.name[0]}</TeamsListEl>
      ))}
    </TeamsWrapper>
  );
};

export default TeamsSidebar;
