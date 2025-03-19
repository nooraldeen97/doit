import React from 'react'


interface validationMessageProp {
    message:string
}
function validationMessage({message}:validationMessageProp) {
  return (
    <div>
    {message ? (
      <div
        className="p-4 mb-4 ml-2 mr-2 text-sm text-red-800 rounded-lg bg-red-50"
        role="alert"
      >
        {message}
      </div>
    ) : (
      ""
    )}
  </div>
  )
}

export default validationMessage





