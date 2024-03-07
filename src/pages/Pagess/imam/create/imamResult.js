import { useEffect, useState } from "react";
import ImamNav from "./navImam";
import Awaiting from "./resultSections/awaiting";
import Verified from "./resultSections/verified";
import Denied from "./resultSections/denied";

export default function ResultImam() {
  const [mosque, setMosque] = useState([]);
  const [mosqueName, setMosqueName] = useState([]);
  const [option, setOption] = useState("awaiting");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [viewBio, setViewBio] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState(null); //Temporary storage for users

  //-------------------Api to get imam mosque------------------------

  const getUserData = async () => {
    try {
      const email = localStorage.getItem("email");
      const res = await fetch("/api/getMosque/getUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      });
      const data = await res.json();

      if (res.ok) {
        setMosque(data);
        return data;
      } else {
        console.error("Error fetching data of user selected mosque:", data);
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  //Get mosque name from array
  useEffect(() => {
    const names = mosque.map((data) => data.name);

    setMosqueName(names);
  }, [mosque]);

  //-------------------^^^^^^^^^^^^^^^^^^^^------------------

  return (
    <div>
      <ImamNav />
      <div className="mosque-name-container-imamResult">
        {mosqueName.map((name, index) => (
          <div className="mosque-name-imamResult" key={index}>
            {name}
          </div>
        ))}
      </div>
      <div className="verify-title-container-imamResult">
        <div
          className="verify-title-imamResult"
          style={{ color: option === "awaiting" ? "#b52d3b" : "" }}
          onClick={() => setOption("awaiting")}
        >
          Awaiting Review
        </div>
        <div
          className="verify-title-imamResult"
          style={{ color: option === "verified" ? "#b52d3b" : "" }}
          onClick={() => setOption("verified")}
        >
          Verified
        </div>
        <div
          className="verify-title-imamResult"
          style={{ color: option === "denied" ? "#b52d3b" : "" }}
          onClick={() => setOption("denied")}
        >
          Denied
        </div>
      </div>
      <div>{option === "awaiting" && <Awaiting />}</div>
      <div>
        {option === "verified" && (
          <div>
            <Verified />
          </div>
        )}
      </div>
      <div>
        {option === "denied" && (
          <div>
            <Denied />
          </div>
        )}
      </div>
    </div>
  );
}
