import { useEffect, useState } from "react";

// todo
export default function StrButtons() {
  //
  const [is, setIs] = useState(false);
  const [storage, setStorage] = useState();
  const [st, toggle] = useStorageContext();

  //
  const getLocalData = () => {
    fetch("example.txt", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setStorage(myJson);
      });
  };

  //
  useEffect(() => {
    if (
      localStorage.getItem("cardsArr") &&
      JSON.parse(localStorage.getItem("cardsArr")).length
    ) {
      setIs(true);
    } else {
      setIs(false);
    }

    getLocalData();
  }, []);

  function clickHandler() {
    if (is) {
      localStorage.setItem("cardsArr", JSON.stringify([]));
    } else {
      localStorage.setItem("cardsArr", JSON.stringify(storage));
    }
    setIs((pr) => !pr);
    toggle();
  }

  return (
    <button
      type="button"
      className="btn btn-primary btn-block"
      onClick={clickHandler}
    >
      {is
        ? "Հեռացնել ուսուցողական տվյալները։"
        : "Տեղադրել ուսուցողական տվյալները։"}
    </button>
  );
}
