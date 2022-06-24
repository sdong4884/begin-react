import React from "react";

function Hello({ name, color, isSpecial }) {
  return (
    <div
      style={{color}}
    >
      {/* {isSpecial ? <b>*</b> : null} */}
      {isSpecial && <b>*</b>}
      Hello {name}
    </div>
  )
}

Hello.defaultProps = {
  name: '이름 없음'
}
export default Hello;
