// todo
import CardDrawer from "./CardDrawer";
import React, { useEffect, useState } from "react";
import HotTags from "./HotTags";
import { useNameContext } from "../new-user/context/NameContext";
import PuffLoader from "react-spinners/PuffLoader";

// todo
export default function Assistent() {
  //
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [name, setName] = useNameContext();

  //
  useEffect(() => {
    if (name === "") {
      return;
    }

    async function fetchData() {
      setLoading(true);
      try {
        let response = await fetch("/cards/getposts");
        let result = await response.json();

        if (response.ok) {
          setPosts(result);
        } else {
          console.log("err");
        }
      } catch (err) {
        console.log(err.message);
      }
      setLoading(false);
    }

    fetchData();
  }, [name]);

  //
  return (
    <div className=" w-100">
      {name &&
        (loading ? (
          <div className="d-flex justify-content-center">
            <PuffLoader color="#f0f" size={150} />
          </div>
        ) : (
          <>
            <div className="mb-4">
              <CardDrawer />
            </div>

            <HotTags allPosts={posts} setAllPosts={setPosts} />
          </>
        ))}
    </div>
  );
}
