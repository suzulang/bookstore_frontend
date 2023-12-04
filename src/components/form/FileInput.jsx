import React from 'react'

function FileInput(props) {
  const {label, setFile, accept, required, className} = props;
  return (
    <div className={className + " form-control"}>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input type="file" required={required} accept={accept} onChange={(e) => setFile(e.target.files[0])} className="file-input file-input-bordered" />
    </div>
  )
}

export default FileInput