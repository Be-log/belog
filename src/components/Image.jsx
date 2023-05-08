import React from 'react';
import styled from 'styled-components';

const PropsImage = styled.img`
  ${({ width, height }) => `width: ${width}px; height: ${height}px; border-radius: 50%;`}
`;

const Image = ({ width, height, src, alt }) => {
  return (
    <PropsImage
      width={width}
      height={height}
      src={src}
      alt={alt}
    />
  );
};

export default Image;
