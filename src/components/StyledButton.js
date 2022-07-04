import React from 'react'
import styled, { css } from 'styled-components'

const sizes = {
  large: {
    height: '3rem',
    lineHeight: '3rem',
    fontSize: '1.25rem',
  },
  medium: {
    height: '2.25rem',
    lineHeight: '2.25rem',
    fontSize: '1rem',
  },
  small: {
    height: '1.75rem',
    lineHeight: '1.75rem',
    fontSize: '0.875rem',
  },
}

const sizeStyles = css`
  ${({ size }) => css`
    height: ${sizes[size].height};
    line-height: ${sizes[size].lineHeight};
    font-size: ${sizes[size].fontSize};
  `}/* ${(props) =>
    props.size === 'small' &&
    css`
      height: 1.75rem;
      line-height: 1.75rem;
      font-size: 0.875rem;
    `}
  ${(props) =>
    props.size === 'medium' &&
    css`
      height: 2.25rem;
      line-height: 2.25rem;
      font-size: 1rem;
    `}
  ${(props) =>
    props.size === 'large' &&
    css`
      height: 3rem;
      line-height: 3rem;
      font-size: 1.25rem;
    `} */
`

const colorStyles = css`
  ${({ theme, color }) => {
    const selected = theme.palette[color]
    return css`
      background: ${selected};
      ${(props) =>
        props.outline &&
        css`
          color: ${selected};
          background: none;
          border: 1px solid ${selected};
        `}
    `
  }}
`

const fullWidthStyles = css`
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
      & + & {
        margin-left: 0;
        margin-top: 1rem;
      }
    `}
`

const Button = styled.button`
  outline: none;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding: 0 1rem;
  & + & {
    margin-left: 1rem;
  }
  /* background: ${({ theme, color }) => theme.palette[color]}; */
  ${colorStyles}
  ${sizeStyles}
  ${fullWidthStyles}
`

function StyledButton({ children, color, size, outline, fullWidth, ...rest }) {
  return (
    <Button
      color={color}
      size={size}
      outline={outline}
      fullWidth={fullWidth}
      {...rest}
    >
      {children}
    </Button>
  )
}

StyledButton.defaultProps = {
  color: 'blue',
  size: 'medium',
}

export default StyledButton
