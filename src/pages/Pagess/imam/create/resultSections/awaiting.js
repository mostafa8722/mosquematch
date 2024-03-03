import { useEffect, useState } from "react";
import Envelope from "../../../../../../public/envelope";
import Image from "next/image";

export default function Awaiting() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [viewBio, setViewBio] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState(null);
  const [messageText, setMessageText] = useState("");

  //-------------Api to retrieve data for all males----------
  useEffect(() => {
    const fetchData = async () => {
      const email1 = localStorage.getItem("email");
      if (email1 === "" || !email1 || email1 === null) {
        return;
      }
      setEmail(email1);
      try {
        const res = await fetch("/api/imam/getInfoAwaiting", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(email1),
        });
        if (!res.ok) {
          const errorMessage = await res.json();
          console.error("Error if:", errorMessage.error);
          return;
        }
        const response = await res.json();

        setData(response.user);
      } catch (error) {
        console.error("Error on first try fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = data.filter((item) => item.gender === "male");
    setFilteredData(filteredData);
  }, [data]);

  //-------------^^^^^^^^^^^^^^^^^^^^------------------

  //-------------Function to calculate age------------------
  function calculateAge(year, month, day) {
    const dateOfBirth = `${year}-${month}-${day}`;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // If the birth date for the current year hasn't occurred yet, subtract one year
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return <div>{age}</div>;
  }
  //-------------^^^^^^^^^^^^^^^^^^^^------------------

  //--------------------View Bio function-------------------
  const ViewBio = async (e, user) => {
    e.preventDefault();

    const username = user;

    const res = await fetch("/api/createAcc/addView", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    if (!res.ok) {
      const errorMessage = await res.json();
      console.error("Error if:", errorMessage.error);
      return;
    }
  };
  //--------------------^^^^^^^^^^^^^-------------------

  const check = (item, userItem) => {
    if (item.length == 0 || item.indexOf(userItem.toLowerCase()) !== -1) {
      return 1;
    }
  };

  //------------------Verifies Email------------------

  const verifyEmail = async (user, command) => {
    const email1 = user;
    console.log("email1:", email1);
    const email2 = localStorage.getItem("email");
    console.log("email2:", email2);
    const res = await fetch("/api/imam/verifyEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email1: email1, email2: email2, number: command }),
    });
    if (!res.ok) {
      const errorMessage = await res.json();
      console.error("Error if:", errorMessage.error);
      return;
    }
    const response = await res.json();
    console.log(response);
  };

  //------------------^^^^^^^^^^^^^-------------------

  //-------------------Sending Message------------------------
  const SendMessage = async (e, user) => {
    e.preventDefault();
    console.log("Send message fucntion started", user);
    const receiver = user;
    const sender = localStorage.getItem("email");

    const data = {
      senderEmail: sender,
      receiverEmail: receiver,
      messageText: messageText,
    };

    const res = await fetch("/api/message/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorMessage = await res.json();
      console.error("Error if:", errorMessage.error);
      return;
    }
    const response = await res.json();
  };

  //-------------------^^^^^^^^^^^^^^^^^^^^------------------

  //CSS IN imam.css in AWAITING SECTION
  return (
    <div className="awaiting-container-awaiting">
      <div className="bottom-container-search">
        {filteredData.map((userInfo) => (
          <div key={userInfo.id} className="result-parent-container-search">
            <div className="result-img-parent-search">
              <div className="img-container-search">
                <Image
                  unoptimized
                  src="/female.jpeg"
                  alt="default"
                  layout="responsive"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div className="result-right-parent-container">
              <div className="result-line1-container-search">
                <div>{userInfo.aboutme_looking}</div>
                <div className="active-text-search">
                  <div>active 0 years ago</div>
                </div>
              </div>
              <div className="result-line2-container-search">
                <div>{userInfo.username},</div>
                <div className="age-search">
                  {calculateAge(
                    userInfo.aboutme_year,
                    userInfo.aboutme_month,
                    userInfo.aboutme_day
                  )}
                </div>
                <div className="mini-seprator-search"></div>

                <button
                  className="view-bio-search"
                  onClick={(e) => {
                    setSelectedUserInfo(userInfo);
                    ViewBio(e, userInfo.username);
                    setViewBio(true);
                  }}
                >
                  View bio
                </button>
                {/* Shows Bio Details */}
                {viewBio && (
                  <div className="bio-container-search">
                    {console.log(
                      "data found on user:",
                      selectedUserInfo.username
                    )}
                    <div className="bio-sub-search">
                      <div className="bio-heading-search">
                        <div className="bio-text-search">Biography</div>
                        <div className="close-bio-search">
                          <div
                            onClick={(e) => {
                              setViewBio(false);
                            }}
                          >
                            X
                          </div>
                        </div>
                      </div>
                      <div className="divider-bio-search"></div>
                      <div className="bio-mini-container-search">
                        <div className="bio-mini-text-search">
                          A Little bit about me
                        </div>
                        <div className="bio-mini-text2-search">
                          {selectedUserInfo.aboutme_about}
                        </div>
                      </div>
                      <div className="bio-mini-container-search">
                        <div className="bio-mini-text-search">
                          What I am looking for
                        </div>
                        <div className="bio-mini-text2-search">
                          {selectedUserInfo.aboutme_looking}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* ^^^^^^^^^^^^^ */}
              </div>
              <div className="result-line3-container-search">
                <div className="distance-search">{userInfo.mosque}</div>
              </div>
              <div className="result-line4-container-search">
                <div>{userInfo.eduwork_profession} -</div>
                <div className="info-search">{userInfo.religion_sector} - </div>
                <div className="info-search">{userInfo.eduwork_subject} -</div>
                <div className="info-search">{userInfo.personal_height} -</div>
                <div className="info-search"> {userInfo.religion_pray}</div>
              </div>
              <div className="result-line5-container-search">
                <div>{userInfo.religion_halal} -</div>
                <div className="info-search"> {userInfo.personal_smoke} -</div>
                <div className="info-search"> {userInfo.personal_drink} -</div>
              </div>
              <div className="result-line5-container-search">
                <div> {userInfo.personal_marriage} -</div>
                <div className="info-search">{userInfo.personal_relocate}</div>
              </div>
              <div className="result-line5-container-search">
                <div>Annual Income: {userInfo.personal_income}</div>
              </div>
            </div>
            <div className="seprator-awaiting"></div>
            <div className="btn-container-awaiting">
              {/* 0 = VERIFY   1 = DENY  */}
              <div
                className="btn-awaiting"
                onClick={() => verifyEmail(userInfo.email, 0)}
              >
                Verify
              </div>
              <div
                className="btn2-awaiting"
                onClick={() => verifyEmail(userInfo.email, 1)}
              >
                Deny
              </div>
              <div
                className="btn3-awaiting"
                onClick={(e) => {
                  setSelectedUserInfo(userInfo);
                  setShowMessage(true);
                }}
              >
                Message
              </div>
              {showMessage && (
                <div className="msg-container-search">
                  <div className="msg-sub-search">
                    <div className="msg-heading-search">
                      <div className="msg-text-search">New Message</div>
                      <div className="close-msg-search">
                        <div
                          onClick={(e) => {
                            setShowMessage(false);
                          }}
                        >
                          X
                        </div>
                      </div>
                    </div>
                    <div className="divider-msg-search"></div>
                    <div className="msg-mini-container-search">
                      <div className="msg-mini-text-search">Message</div>
                      <textarea
                        placeholder="Enter your message here"
                        className="msg-input-search"
                        onChange={(e) => {
                          setMessageText(e.target.value);
                        }}
                      ></textarea>
                      <div className="send-msg-container-search">
                        <button
                          className="send-msg-search"
                          onClick={(e) => {
                            SendMessage(e, selectedUserInfo.email);
                            setShowMessage(false);
                          }}
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
