// components/Sidebar.js
import React from 'react';
import styled from 'styled-components';

const SidebarWrapper = styled.aside`
  background-color: ${({ theme }) => theme.colors.lightGrey};
  width: 200px;
  padding: 1rem;
`;

export const Sidebar = () => (
  <SidebarWrapper>
    <h3>Quick Links</h3>
    <ul>
      <li>Link 1</li>
      <li>Link 2</li>
      <li>Link 3</li>
    </ul>
  </SidebarWrapper>
);