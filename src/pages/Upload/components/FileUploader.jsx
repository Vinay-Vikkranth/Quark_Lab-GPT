import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineCloudUpload } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import "./file-uploader.css";

export default function FileUploader({ onFilesSelected, width, height }) {
  const [files, setFiles] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files || []);
    setFiles(droppedFiles);
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
  };

  useEffect(() => {
    onFilesSelected(files);
  }, [files]);

  return (
    <section className="drag-drop" style={{ width, height }}>
      <div
        className={`document-uploader ${files.length > 0 ? "upload-box active" : "upload-box"}`}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <label htmlFor="browse" className="upload-info">
          <AiOutlineCloudUpload className="text-4xl text-blue-700/75" />
          <div>
            <p>Drag and drop your files or click here to browse</p>
          </div>
          <input
            type="file"
            hidden
            id="browse"
            onChange={handleFileChange}
            accept=".png, .jpg, .jpeg, .pdf, .docx, .pptx, .txt, .xlsx"
            multiple
          />
        </label>

        {files.length > 0 && (
          <div className="file-list__container">
            {files.map((file, index) => (
              <div key={index} className="file-item">
                <div className="file-info">
                  <p>{file.name}</p>
                </div>
                <div className="file-actions">
                  <MdClear onClick={() => handleRemoveFile(index)} />
                </div>
              </div>
            ))}
          </div>
        )}

        {files.length > 0 && (
          <div className="success-file">
            <AiOutlineCheckCircle style={{ color: "#6DC24B", marginRight: 4 }} />
            <p>{files.length} file(s) selected</p>
          </div>
        )}
      </div>
    </section>
  );
}
