import React from 'react';
import styled from 'react-emotion';

/**
 * Render Info line in the bottom of screen
 */
const Info = () => {
  return (
    <Div>
      <A target="_blank" rel="noopener noreferrer" href="https://github.com/karpolan/apollo-tutorial">
        {process.env.REACT_APP_NAME.toUpperCase()}
      </A>
      {` ver: ${process.env.REACT_APP_VERSION}. Created by `}
      <A target="_blank" rel="noopener noreferrer" href="https://websites.karpolan.com">
        KARPOLAN
      </A>
    </Div>
  );
};

const Div = styled('div')({
  borderTop: '1px #888 solid',
  backgroundColor: '#ccc',
  textAlign: 'center',
  padding: '5px 0',
  margin: '0 auto',
});

const A = styled('a')({
  color: '#747790',
  color: '#555',
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
});

export default Info;
