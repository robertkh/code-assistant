// todo
import React, { useRef, useState } from "react";
import useFileUpload from "react-use-file-upload";
import { message, Divider } from "antd";
import { FaFolderOpen } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import "./fileUpload.css";
import ckeck_file_exist from "./check_file_exist";

// todo - main component
export default function FileUpload({ className }) {
  //?
  const { files, createFormData, setFiles, clearAllFiles } = useFileUpload();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  //?
  const handleSubmit = async () => {
    const formData = createFormData();
    setLoading(true);

    let response = await fetch("/files/upload", {
      method: "POST",
      body: formData,
    });

    let result = await response.json();

    if (response.ok) {
      message.success(result);
      clearAllFiles();
      setLoading(false);
    } else {
      message.error(result);
    }
  };

  //?
  return (
    <>
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        onChange={(e) => {
          const selectedFile = inputRef.current.files[0];

          if (!selectedFile) {
            return;
          }

          if (
            selectedFile?.type !== "image/jpeg" &&
            selectedFile?.type !== "image/jpg" &&
            selectedFile?.type !== "image/png"
          ) {
            message.error("Ընտրված ֆայլը նկար չէ։");
            inputRef.current.value = null;
            return;
          }

          if (selectedFile?.size > 500000) {
            message.error("Ընտրված ֆայլի ծավալը մեծ է 500KB։");
            inputRef.current.value = null;
            return;
          }
          selectedFile.src = URL.createObjectURL(selectedFile);

          setFiles(e, "a");
          inputRef.current.value = null;
        }}
      />

      <div className={className}>
        <Divider style={{ color: "red" }}>File Upload</Divider>

        <div className="d-flex justify-content-between">
          {files[files.length - 1] && (
            <div>
              <img
                src={files[files.length - 1]?.src || "Phold.png"}
                alt="rrr"
                height="38px"
                data-tip
                data-for="custom-img"
              />

              <ReactTooltip
                id="custom-img"
                type="warning"
                effect="solid"
                place="bottom"
              >
                <img
                  src={files[files.length - 1]?.src || "Phold.png"}
                  alt="rrr"
                  width="300"
                />
              </ReactTooltip>
            </div>
          )}

          <div className=" mt-1">
            {files[files.length - 1] ? (
              <div>
                <span> Name: </span>
                <span className="text-primary">
                  {" "}
                  {files[files.length - 1]?.name}{" "}
                </span>
                <span className="ml-2">Size: </span>
                <span className="text-primary">
                  {Math.ceil(files[files.length - 1]?.size / 1000)} KB
                </span>
              </div>
            ) : (
              <span>{"Ընտրեք նկարը"} ( "առավելագույն չափը:" 500KB )</span>
            )}
          </div>

          <div>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              style={{ lineHeight: 0.6 }}
              onClick={() => {
                inputRef.current.click();
              }}
            >
              <FaFolderOpen size={18} />
              {"\u00A0\u00A0"}
              {files[files.length - 1] ? "Փոխել" : "Ընտրել"}
            </button>
          </div>
        </div>

        <div className="d-grid pt-3">
          <button
            type="submit"
            className="btn btn-success btn-block btn-sm "
            disabled={!files[files.length - 1]}
            onClick={async () => {
              setLoading(true);
              let permission = await ckeck_file_exist(
                files[files.length - 1]?.name
              );
              if (permission) {
                handleSubmit();
              } else {
                setLoading(false);
              }
            }}
          >
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            {"\u00A0\u00A0 Վերբեռնել"}
          </button>
        </div>
      </div>
    </>
  );
}
