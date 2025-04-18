import styled, { keyframes } from 'styled-components';

const LoaderKeyframes = keyframes`
  0%     {transform: translateY(0)}
  16.67% {transform: translateY(-10px)}
  33.33% {transform: translateY(10px)}
  50%,
  100%   {transform: translateY(0)}
`;

const Loader = styled.div`
  --s: 40px;
  --_d: calc(0.353 * var(--s));
  width: calc(var(--s) + var(--_d));
  aspect-ratio: 1;
  display: flex;
  margin: 100px auto;
  &::before,
  &::after {
    content: '';
    flex: 1;
    clip-path: polygon(
      var(--_d) 0,
      100% 0,
      100% calc(100% - var(--_d)),
      calc(100% - var(--_d)) 100%,
      0 100%,
      0 var(--_d)
    );
    background: conic-gradient(
      from -90deg at calc(100% - var(--_d)) var(--_d),
      #fff 135deg,
      #666 0 270deg,
      #aaa 0
    );
    animation: ${LoaderKeyframes} 1.2s infinite;
  }
  &::before {
    margin-right: calc(var(--_d) / -2 - 1px);
  }
  &::after {
    margin-left: calc(var(--_d) / -2 - 1px);
    animation-delay: 0.6s;
  }
`;

export default Loader;
