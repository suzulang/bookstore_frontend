import React from 'react'

function Input({label, type, setData, placeholder, className, auth}) {
  return (
    <div className={className + " form-control"}>
        <label className="label">
            <span className="label-text">{label}</span>
        </label>
        <input type={type || "text"} placeholder={placeholder || label} onChange={e => setData(e.target.value)} className={`input ${!auth && 'input-sm md:input-md'} input-bordered w-full`} />
    </div>
  )
}

export default Input