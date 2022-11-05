// todo
import React, { useState, useRef } from "react";
import { Button, Drawer, Affix, message } from "antd";
import FileUpload from "../file_upload/File_upload";

// todo
function CardDrawer() {
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  //
  function showDrawer() {
    setState(true);
  }

  //
  function onClose() {
    setState(false);
  }

  //
  function reset() {
    formRef.current.elements[0].value = "";
    formRef.current.elements[1].value = "";
    formRef.current.elements[2].value = "";
  }

  //
  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);

    try {
      let response = await fetch("/cards/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formRef.current.elements[0].value,
          href: formRef.current.elements[1].value,
          img: formRef.current.elements[2].value,
          time: Date.now(),
        }),
      });

      let result = await response.json();

      if (response.ok) {
        onClose();
        message.success(result);
        reset();
      } else {
        message.error(result);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  //
  return (
    <div className="mb-4">
      <Affix offsetTop={-15}>
        <Button
          type="primary"
          onClick={showDrawer}
          block
          className="mt-3 rounded"
        >
          Ստեղծել նոր փոստ
        </Button>
      </Affix>

      <Drawer
        title="Ավելացնել նոր թեմա"
        width={720}
        onClose={onClose}
        visible={state}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <form
          ref={formRef}
          onSubmit={submitHandler}
          className=" border border-warning p-2 rounded"
        >
          <div className="form-group my-3">
            <label htmlFor="title" className="text-primary">
              Վերնագիր:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Վերնագրով փնտրում ենք նյութը․․․"
              name="title"
              required
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="href" className="text-primary">
              Հղում:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Այստեղ նյութի ինտերնետային հասցեն․․․"
              name="href"
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="img" className="text-primary">
              Ֆայլի անունը:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Այստեղ նկար-ֆայլի անունը․․․"
              name="img"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block w-100 btn-sm mt-3"
          >
            {loading && <span class="spinner-border spinner-border-sm"></span>}
            {"\u00A0\u00A0"} Հաստատել
          </button>
        </form>

        <div className="w-100">
          <FileUpload
            className="w-100 mx-auto mt-3 border border-warning p-2 rounded"
            drClose={onClose}
          />
        </div>
      </Drawer>
    </div>
  );
}

// todo
export default CardDrawer;
