import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconWrapper = styled.svg`
  display: inline-block;
  vertical-align: middle;
  shape-rendering: crispEdges;
  ${({ color, theme }) => color && `fill: ${theme.colors[color] || color};`}
`;

const ICONS = {
  home: (
    <path d="M0 8h2v7h12v-7h2v-2h-2v-2h-2v-2h-2v-2h-4v2h-2v2h-2v2h-2v2z M4 8h8v5h-2v-3h-4v3h-2v-5z" />
  ),
  gamepad: (
    <path d="M0 4v8h16v-8h-16zM4 10h-2v-2h2v2zM14 10h-2v-2h2v2zM11 7h-2v2h-2v-2h-2v-2h2v-2h2v2h2v2z" />
  ),
  users: (
    <path d="M8 3v2h2v2h2v4h-2v2h-6v-2h3v-2h-5v4h-2v-6h2v-2h2v-2h4zM12 5v-2h-2v2h2zM6 5v-2h-2v2h2zM14 7v6h2v-6h-2zM0 7v6h2v-6h-2z" />
  ),
  chart: (
    <path d="M0 0v16h16v-2h-14v-14h-2zM4 10h2v4h-2v-4zM8 4h2v10h-2v-10zM12 7h2v7h-2v-7z" />
  ),
  moon: (
    <path d="M8 0c-2.2 0-4.2 0.9-5.7 2.3 3.1 1.4 5.2 4.5 5.2 8.2 0 1.5-0.4 3-1.1 4.3 0.5 0.1 1.1 0.2 1.6 0.2 4.4 0 8-3.6 8-8s-3.6-8-8-8z" />
  ),
  sun: (
    <path d="M8 3v-3h-2v3h2zM11.3 4.7l2.1-2.1-1.4-1.4-2.1 2.1 1.4 1.4zM13 8h3v-2h-3v2zM11.3 11.3l1.4 1.4 2.1-2.1-1.4-1.4-2.1 2.1zM8 13v3h-2v-3h2zM2.7 11.3l-2.1 2.1 1.4 1.4 2.1-2.1-1.4-1.4zM3 8h-3v-2h3v2zM2.7 4.7l1.4-1.4-2.1-2.1-1.4 1.4 2.1 2.1zM8 5c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z" />
  ),
  bell: (
    <path d="M8 16c1.1 0 2-0.9 2-2h-4c0 1.1 0.9 2 2 2zM14 9v-3c0-3.1-2.1-5.6-5-6.3v-0.7h-2v0.7c-2.9 0.7-5 3.2-5 6.3v3l-2 2v1h16v-1l-2-2zM12 10h-8v-4c0-2.2 1.8-4 4-4s4 1.8 4 4v4z" />
  ),
  chat: (
    <path d="M14 2h-12c-1.1 0-2 0.9-2 2v7c0 1.1 0.9 2 2 2h3v3l3-3h6c1.1 0 2-0.9 2-2v-7c0-1.1-0.9-2-2-2zM14 11h-12v-7h12v7z" />
  ),
  user: (
    <path d="M8 0c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zM8 10c-4.4 0-8 1.8-8 4v2h16v-2c0-2.2-3.6-4-8-4z" />
  ),
  login: (
    <path d="M9 4v-3h-9v14h9v-3h-1v2h-7v-12h7v2h1zM16 8l-5-4v2h-5v4h5v2l5-4z" />
  ),
};

const PixelIcon = ({ name, color, size, ...props }) => {
  if (!ICONS[name]) {
    console.warn(`Icon "${name}" does not exist.`);
    return null;
  }

  return (
    <IconWrapper
      width={size}
      height={size}
      viewBox="0 0 16 16"
      color={color}
      aria-hidden="true"
      {...props}
    >
      {ICONS[name]}
    </IconWrapper>
  );
};

PixelIcon.propTypes = {
  name: PropTypes.oneOf(Object.keys(ICONS)).isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};

PixelIcon.defaultProps = {
  color: 'currentColor',
  size: 16,
};

export default PixelIcon;