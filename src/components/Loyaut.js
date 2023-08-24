import styled from 'styled-components';

export const Layout = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

export const Preloader = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #d3d6e6;
  opacity: 70%;
`;