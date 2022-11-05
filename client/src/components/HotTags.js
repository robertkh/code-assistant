// todo
import { Divider, Tag, Badge } from "antd";
import { useState } from "react";
import { Collapse } from "reactstrap";
import Mycard from "./Mycard";
import { RightCircleTwoTone, DownCircleTwoTone } from "@ant-design/icons";

//?
const { CheckableTag } = Tag;

//?
const tagsData = [
  "html",
  "css",
  "js",
  "mongodb",
  "express",
  "react",
  "node",
  "git",
  "npm",
  "heroku",
  "linux",
  "sql",
  "http",
  "vscode",
  "python",
];

//?
function makeRelatedTagsSet(checkedTagsArr, allPostsArr, selectedPostsArr) {
  let relatedTagsArr = [];

  for (let i = 0; i < allPostsArr?.length; i++) {
    //
    let is = true;
    let tempArr = allPostsArr[i].title.trim().replace(/ {2,}/, " ").split(" ");

    for (let j = 0; j < checkedTagsArr.length; j++) {
      let ind = tempArr.findIndex((el) => checkedTagsArr[j] === el);

      if (ind === -1) {
        is = false;
        break;
      }
    }

    // ete ayo apa  setMakerArr = SetMakerArr.concat(allPostsArr[i].tags)
    if (is) {
      relatedTagsArr = relatedTagsArr.concat(
        allPostsArr[i].title.trim().replace(/ {2,}/, " ").split(" ")
      );
      selectedPostsArr.push(allPostsArr[i]);
    }
  }

  const relatedTagsSet = new Set(relatedTagsArr);

  //
  for (let j = 0; j < checkedTagsArr.length; j++) {
    relatedTagsSet.delete(checkedTagsArr[j]);
  }

  // արդեն ոչ checked՝ մաքրված տեգերի մասիվի վերադարձ։
  return Array.from(relatedTagsSet);
}

// todo
export default function HotTags({ allPosts, setAllPosts }) {
  const [state, setState] = useState({ selected: [] });
  const [isOpen, setIsOpen] = useState(false); // slaqy ` >

  const selectedPostsArr = []; // կախված է selected տեգերից փոփոխվում ա։

  let relatedSetArr = makeRelatedTagsSet(
    state.selected,
    allPosts,
    selectedPostsArr
  );

  //
  function handleChange(tag, checked) {
    const { selected } = state;

    const selectedArr = checked
      ? [...selected, tag]
      : selected.filter((t) => t !== tag);

    setState({ selected: selectedArr });
  }

  //
  const toggle2 = () => setIsOpen(!isOpen);

  //
  const { selected } = state;
  let ch = "";

  return (
    <>
      <div className="border border-danger rounded my-2 p-2">
        <Divider className="text-success">
          {selected.length ? "Ընտրված տեգեր" : "Հիմնական թեմաներ"}
        </Divider>

        {(selected.length === 0 ? tagsData : selected).map((tag) => (
          <CheckableTag
            key={tag}
            checked={selected.indexOf(tag) > -1}
            onChange={(checked) => {
              handleChange(tag, checked);
            }}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>

      <div className="border border-danger rounded  mb-5 p-2">
        <Divider className="text-success">
          {relatedSetArr.length ? "Կապակցված տեգեր" : "Կապակցված տեգեր չկան"}
        </Divider>

        {relatedSetArr.sort().map((tag) => (
          <span key={tag}>
            {ch === tag[0].toUpperCase() ? (
              ""
            ) : (
              <Badge
                count={(ch = tag[0].toUpperCase())}
                style={{ backgroundColor: "#52c41a" }}
              />
            )}

            <CheckableTag
              checked={selected.indexOf(tag) > -1}
              onChange={(checked) => {
                handleChange(tag, checked);
              }}
            >
              {tag}
            </CheckableTag>
          </span>
        ))}
      </div>

      <div>
        <Divider className="text-info">{`Փոստերի քանակը հավասար է ${selectedPostsArr.length}`}</Divider>

        {!isOpen ? (
          <RightCircleTwoTone
            style={{
              position: "relative",
              top: "-44px",
              fontSize: "30px",
              cursor: "pointer",
            }}
            onClick={toggle2}
          />
        ) : (
          <DownCircleTwoTone
            style={{
              position: "relative",
              top: "-44px",
              fontSize: "30px",
              cursor: "pointer",
            }}
            onClick={toggle2}
          />
        )}

        <Collapse isOpen={isOpen}>
          {selectedPostsArr.map((el) => (
            <Mycard
              key={el._id}
              id={el._id}
              title={el.title}
              href={el.href}
              img={el.img}
              time={el.created}
              posts={allPosts}
              setPosts={setAllPosts}
            />
          ))}
        </Collapse>
      </div>
    </>
  );
}
