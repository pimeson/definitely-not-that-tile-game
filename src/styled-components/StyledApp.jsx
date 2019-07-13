import tileBg from '../static/281.jpg';
import styled from '@emotion/styled';

const StyledApp = styled.div`
  display: grid;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(${tileBg});
  background-size: cover;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "tile-left title title title-right"
    "staging-area staging-area board-area board-area"
    "btn-left game-buttons game-buttons btn-right";
  h3 {
    color: #ecf0f1;
    background: #95a5a6;
    padding: .5em;
    grid-area: title;
  }
  .game-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2em;
    justify-content: space-evenly;
    grid-area: game-buttons;
    padding: 1em;
    button {
      padding: .25em;
      font-size: 1em;
    }
  }
  .title {
    grid-area: title;
    font-size: 1.5em;
  }
  .board-area {
    grid-area: board-area;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 2em;
  }
  .staging-area {
    grid-area: staging-area;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 2em;
  }
  .Azul-tile {
    background: powderblue;
  }
  .Black-tile {
    background: black;
  }
  .Red-tile {
    background: orangered;
  }
  .Yellow-tile {
    background: gold;
  }
  .LightBlue-tile {
    background: deepskyblue;
  }
  .tile {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    border-style: outset;
  }
`;

export default StyledApp