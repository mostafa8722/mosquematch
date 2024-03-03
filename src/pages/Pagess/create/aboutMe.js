import { useEffect } from "react";
import NavMini from "./navMini";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { AppContext } from "../AppContext";
import { useState, useContext } from "react";
import { WhereLive, Countries, Dates, Months, Years } from "@/data/dataAcc";

export default function AboutMeSection() {
  const { aboutmeContext, setAboutmeContext } = useContext(AppContext);
  const [t, i18n] = useTranslation("global");
  const { push } = useRouter();
  //----------Storing input data in state----------------
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [dayDate, setDayDate] = useState("");
  const [monthDate, setMonthDate] = useState("");
  const [yearDate, setYearDate] = useState("");
  const [tag, setTag] = useState("");
  const [about, setAbout] = useState("");
  const [looking, setLooking] = useState("");
  //-----------------^^^^^^^^^^----------------

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

  //------------------Updates State----------------

  const handleSelectChange = (e, setFunction) => {
    setFunction(e.target.value);
    console.log("country:", country);
  };
  //------------------^^^^^^^^^^^^^^^----------------

  //------------------Updates Context and shifts page----------------

  const handleSubmit = (e) => {
    const aboutMeData = {
      //Add all data to this object
      location: location,
      country: country,
      day: dayDate,
      month: monthDate,
      year: yearDate,
      tag: tag,
      about: about,
      looking: looking,
    };
    setAboutmeContext(aboutMeData); //Updates context

    console.log("About me: ", aboutmeContext);

    e.preventDefault();

    push("/Pagess/create/eduWork");
  };
  //------------------^^^^^^^^^^^^^^^---------------

  return (
    <form onSubmit={handleSubmit}>
      <NavMini />
      <div className="parent-aboutMe">
        <div className="heading-container-aboutMe">
          <div className="heading-aboutMe">{t("aboutMe.heading")}</div>
        </div>
        <div className="box-container-aboutMe">
          <div className="box-aboutMe">
            <div>
              <div className="location-aboutMe">{t("aboutMe.where")}</div>
              <div className="select-location-aboutMe">
                <select
                  value={location}
                  onChange={(e) => handleSelectChange(e, setLocation)}
                  required
                >
                  <option></option>
                  {WhereLive.map((city) => (
                    <option key={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="select-conatiner-aboutMe">
              <div className="location-aboutMe">{t("aboutMe.country")}</div>
              <div className="select-location-aboutMe">
                <select
                  value={country}
                  onChange={(e) => handleSelectChange(e, setCountry)}
                  required
                >
                  <option></option>
                  {Countries.map((city) => (
                    <option key={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="select-conatiner-aboutMe">
              <div className="location-aboutMe">{t("aboutMe.date")}</div>
              <div className="select-date-aboutMe">
                <div className="option-date-aboutMe">
                  <select
                    value={dayDate}
                    onChange={(e) => handleSelectChange(e, setDayDate)}
                    required
                  >
                    <option></option>
                    {Dates.map((city) => (
                      <option key={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div className="option-date-aboutMe">
                  <select
                    value={monthDate}
                    onChange={(e) => handleSelectChange(e, setMonthDate)}
                    required
                  >
                    <option></option>
                    {Months.map((city) => (
                      <option key={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div className="option-date-aboutMe">
                  <select
                    value={yearDate}
                    onChange={(e) => handleSelectChange(e, setYearDate)}
                    required
                  >
                    <option></option>
                    {Years.map((city) => (
                      <option key={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="select-conatiner-aboutMe">
              <div className="location-aboutMe">{t("aboutMe.tag")}</div>
              <div className="input-container-aboutMe">
                <input
                  onChange={(e) => {
                    setTag(e.target.value);
                  }}
                  className="input-tag-aboutMe"
                  required
                />
              </div>
            </div>
            <div className="select-conatiner-aboutMe">
              <div className="location-aboutMe">{t("aboutMe.about")}</div>
              <div className="input-container-aboutMe">
                <input
                  onChange={(e) => {
                    setAbout(e.target.value);
                  }}
                  className="input-little-aboutMe"
                  required
                />
              </div>
            </div>
            <div className="select-conatiner-aboutMe">
              <div className="location-aboutMe">{t("aboutMe.what")}</div>
              <div className="input-container-aboutMe">
                <input
                  onChange={(e) => {
                    setLooking(e.target.value);
                  }}
                  className="input-little-aboutMe"
                  required
                />
              </div>
            </div>
            <div className="button-container-aboutMe">
              <button type="submit" className="button-aboutMe">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
