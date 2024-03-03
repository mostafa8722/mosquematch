import React, { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import ResultNav from "./navResult";
import Filters from "./filters";
import Search from "./search";
import { useRouter } from "next/navigation";

export default function Results() {
  const { genderContext, setGenderContext } = useContext(AppContext);
  const { aboutmeContext, setAboutmeContext } = useContext(AppContext);
  const { personalContext, setPersonalContext } = useContext(AppContext);
  const { religonContext, setReligonContext } = useContext(AppContext);
  const { push } = useRouter();

  //------------------Checks for token----------------
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token === null && !token) {
      console.log("token not found");
      push("/Pagess/sign/signIn/signIn");
    } else {
      console.log("Token found!");
    }
  }, []);
  //------------------^^^^^^^^^^^^^^^----------------

  return (
    <form>
      <div className="parent-result">
        <ResultNav />
        <div className="box-parent-result">
          <Filters />
          <div className="search-parent-result">
            {/* Do not remove this div*/}
            <Search />
          </div>
        </div>
      </div>
    </form>
  );
}
