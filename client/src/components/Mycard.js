// todo
import { BackTop, Tag, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useRef } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import moment from "moment";
import "moment/min/locales";
moment.locale("hy-am");

//?
function magic(str) {
  let arr = str?.trim().replace(/ {2,}/, " ").split(" ");
  return arr?.map((el) => (
    <Tag key={el} color="cyan">
      #{el}
    </Tag>
  ));
}

// todo
export default function Mycard(props) {
  //
  const { posts, setPosts, id, href, img, time, title } = props;
  const [editmode, setState] = useState(false);
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  //
  async function submitHandler(e) {
    e.preventDefault();
    const formData = {
      title: formRef.current.title.value,
      href: formRef.current.href.value,
      img: formRef.current.img.value,
    };

    setLoading(true);

    try {
      let response = await fetch("/cards/update", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          title: formRef.current.title.value,
          href: formRef.current.href.value,
          img: formRef.current.img.value,
        }),
      });

      let result = await response.json();

      if (response.ok) {
        const ind = posts.findIndex((el) => el._id === id);
        posts[ind] = {
          ...posts[ind],
          title: formData.title,
          href: formData.href,
          img: formData.img,
        };

        setPosts([...posts]);
        message.success(result);
      } else {
        message.error(result);
      }
    } catch (err) {
      console.log(err.message);
    }

    setLoading(false);
    setState(false);
  }

  //
  async function delHandler(id) {
    let answer = window.confirm("Իրո՞ք ցանկանում եք փոստը հեռացնել։");
    if (!answer) {
      return;
    }

    setLoading(true);

    try {
      let response = await fetch("/cards/del", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      let result = await response.json();

      if (response.ok) {
        const ind = posts.findIndex((el) => el._id === id);
        posts.splice(ind, 1);
        setPosts([...posts]);

        message.success(result);
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
    <>
      <BackTop duration={50} />
      <>
        {editmode ? (
          <form
            ref={formRef}
            onSubmit={submitHandler}
            className="border border-dark rounded p-2"
          >
            <div className="form-group my-3">
              <label htmlFor="title" className="text-primary">
                Վերնագիր:
              </label>
              <input
                type="text"
                className="form-control"
                defaultValue={title}
                name="title"
              />
            </div>

            <div className="form-group my-3">
              <label htmlFor="href" className="text-primary">
                Հղում:
              </label>
              <input
                type="text"
                className="form-control"
                defaultValue={href}
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
                defaultValue={img}
                name="img"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 btn-sm mt-3 d-flex justify-content-center"
            >
              <PuffLoader color="#ffffff" loading={loading} size={21} />
              {"\u00A0\u00A0 "}
              Պահպանել
            </button>
          </form>
        ) : (
          <div className="border border-ligth rounded p-3 my-2">
            <p>
              {magic(title)}{" "}
              <Tag color="magenta">{moment(time).format("L")}</Tag>
              {loading ? (
                <span
                  class="spinner-border spinner-border-sm mt-1"
                  style={{
                    color: "#08c",
                    float: "right",
                    marginLeft: "20px",
                  }}
                ></span>
              ) : (
                <DeleteOutlined
                  style={{
                    fontSize: "21px",
                    color: "#08c",
                    float: "right",
                    cursor: "pointer",
                    marginLeft: "20px",
                  }}
                  onClick={() => delHandler(id)}
                />
              )}
              <EditOutlined
                style={{
                  fontSize: "22px",
                  color: "#08c",
                  float: "right",
                  cursor: "pointer",
                }}
                onClick={() => setState(true)}
              />
            </p>

            <p>
              <a href={href} target="_blank" rel="noreferrer">
                {href}
              </a>
            </p>

            <img
              src={`https://626fabe3b87ecf1a40cb0de2.s3.eu-central-1.amazonaws.com/${img}`}
              className="w-100"
              alt="code"
            />
          </div>
        )}
      </>
    </>
  );
}
