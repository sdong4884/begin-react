import React from 'react'
import styled from 'styled-components'
import Button from './Button'

const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
`

const DialogBlock = styled.div`
  width: 320px;
  padding: 1.5rem;
  background: #fff;
  border-radius: 2px;
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.125rem;
  }
`

const ButtonGoup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
`

const ShortMarginButton = styled(Button)`
  & + & {
    margin-left: 0.5rem;
  }
`

function Dialog({
  title,
  children,
  cancelText,
  confirmText,
  visible,
  onCancelDialog,
  onConfirmDialog,
}) {
  if (!visible) return null
  return (
    <DarkBackground>
      <DialogBlock>
        <h3>{title}</h3>
        <p>{children}</p>
        <ButtonGoup>
          <ShortMarginButton color="gray" onClick={onCancelDialog}>
            {cancelText}
          </ShortMarginButton>
          <ShortMarginButton color="pink" onClick={onConfirmDialog}>
            {confirmText}
          </ShortMarginButton>
        </ButtonGoup>
      </DialogBlock>
    </DarkBackground>
  )
}

Dialog.defaultProps = {
  cancelText: '취소',
  confirmText: '확인',
}

export default Dialog
