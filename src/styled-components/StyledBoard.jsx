import styled from '@emotion/styled';
import marble from '../static/63511.jpg';

const StyledBoard = styled.div`
  display: grid;
  border-style: outset;
  grid-template-columns: repeat(5, 100px);
  grid-template-rows: repeat(5, 100px);
  grid-gap: 10px;
  padding: 10px;
  background: url(${marble});
  background-size: cover;
  grid-area: board;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

export default StyledBoard