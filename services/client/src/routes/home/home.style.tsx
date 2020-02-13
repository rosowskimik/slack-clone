import styled from 'styled-components';

export const HomeStyles = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 100px 250px 1fr;
  grid-template-rows: auto 1fr auto;
`;

export const StyledHeader = styled.header`
  grid-column: 3;
  grid-row: 1;
`;

export const StyledTeams = styled.aside`
  grid-column: 1;
  grid-row: 1 / 4;
  background: #362233;
`;

export const StyledChannels = styled.aside`
  grid-column: 2;
  grid-row: 1 / 4;
  background: #52364e;
`;

export const StyledMessages = styled.main`
  grid-column: 3;
  grid-row: 2 / 3;
`;

export const StyledInput = styled.input`
  grid-column: 3;
  grid-row: 3;
`;
