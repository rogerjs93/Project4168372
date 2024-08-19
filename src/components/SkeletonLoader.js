import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const SkeletonPulse = styled.div`
  display: inline-block;
  height: ${props => props.height || '20px'};
  width: ${props => props.width || '100%'};
  background-color: #f0f0f0;
  background-image: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  background-repeat: no-repeat;
  border-radius: ${props => props.borderRadius || '4px'};
  animation: ${shimmer} 1.5s infinite;
`;

export const SkeletonLine = styled(SkeletonPulse)`
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const SkeletonCircle = styled(SkeletonPulse)`
  width: ${props => props.size || '50px'};
  height: ${props => props.size || '50px'};
  border-radius: 50%;
`;

export const SkeletonRect = styled(SkeletonPulse)`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100px'};
`;

export default {
  Line: SkeletonLine,
  Circle: SkeletonCircle,
  Rect: SkeletonRect,
};