import React from 'react';
import { ChannelsWrapper, ChannelsList } from './channels-sidebar.style';

interface Props {
  teamName: string;
  userName: string;
  channels: { id: string | number; name: string }[];
}

const ChannelsSidebar: React.FC<Props> = ({ teamName, userName, channels }) => {
  return (
    <ChannelsWrapper>
      <div>
        {teamName} {userName}
      </div>
      <ChannelsList>
        <li>Channels</li>
        {channels.map(channel => (
          <li key={channel.id}># {channel.name}</li>
        ))}
      </ChannelsList>
    </ChannelsWrapper>
  );
};

export default ChannelsSidebar;
