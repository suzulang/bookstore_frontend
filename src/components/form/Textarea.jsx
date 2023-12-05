import React from 'react'

function Textarea({label, setData, placeholder, className}) {
  return (
    <div className={className + " form-control"}>
        <label className="label">
            <span className="label-text">{label}</span>
        </label>
        <textarea placeholder={placeholder || label} onChange={e => setData(e.target.value)} className="textarea text-sm md:textarea-md textarea-bordered h-24" ></textarea>
    </div>
  )
}

export default Textarea