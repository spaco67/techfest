function FileUpload({ onFileUpload }) {
  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      onFileUpload(file)
    }
  }

  return (
    <div className="file-input">
      <input
        type="file"
        accept=".csv"
        onChange={handleChange}
      />
    </div>
  )
}

export default FileUpload
