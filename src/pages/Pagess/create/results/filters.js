import { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "../../AppContext";

export default function Filters() {
  /*------------------States to manage showing slides----------------*/
  const [ethnicity, setEthnicity] = useState(false);
  const [body, setBody] = useState(false);
  const [incomes, setIncomes] = useState(false);
  const [marital, setMarital] = useState(false);
  const [smoke, setSmoke] = useState(false);
  const [drink, setDrink] = useState(false);
  const [phones, setPhones] = useState(false);

  const [religon, setReligon] = useState(false);
  const [sect, setSect] = useState(false);
  const [revert, setRevert] = useState(false);
  const [hijab, setHijab] = useState(false);
  const [halal, setHalal] = useState(false);
  const [pray, setPray] = useState(false);
  const [quran, setQuran] = useState(false);

  const [checked, isChecked] = useState(true);

  //Setting the Slider Data
  const [sliderValue, setSliderValue] = useState(7000);

  //Context Range Variable
  const { rangeContext, setRangeContext } = useContext(AppContext);
  const rangeInputRef = useRef("");

  //--------------Intializing context----------------
  const { filterContext, setFilterContext } = useContext(AppContext);
  //--------------^^^^^^^^^^^^^^^^------------------

  /*----------Arrays for checkbox names / data-----------*/
  const ethnicities = [
    "Asian",
    "African",
    "Latin",
    "East Indian",
    "Mixed",
    "Native American",
    "Pacific Islander",
    "Caucasian",
    "Other",
  ];

  const bodytype = ["Slim", "Athletic", "Medium", "Muscular", "Large"];
  const income = ["Below Average", "Average", "Above Average"];
  const maritalStatus = ["Divorced", "Never Married", "Widowed", "Married"];
  const smoking = ["No", "Yes", "Sometimes", "Stopped"];
  const drinking = ["No", "Yes", "Sometimes", "Stopped"];
  const phone = ["Attatched to my phone", "Regular User", "Not Much"];

  const religiousness = [
    "Very Religious",
    "Religious",
    "Somewhat Religious",
    "Not Religious",
    "Prefer Not To Say",
  ];
  const sects = ["Just Muslim", "Sunni", "Shia", "Other"];

  const reverts = ["Yes", "No"];
  const hijabs = ["Yes Hijab", "Yes Niqab", "No", "Other"];
  const halals = [
    "Always Keep Halal",
    "Usually Keep Halal",
    "I Keep Halal At Home",
    "Don't Keep Halal",
  ];
  const prays = ["Always", "Usually", "Sometimes", "Never"];
  const qurans = ["Always", "Usually", "Sometimes", "Never"];

  const [filterRules, setFilterRules] = useState({
    ethnicities: [],
    bodytype: [],
    income: [],
    maritalStatus: [],
    smoking: [],
    drinking: [],
    phone: [],
    religiousness: [],
    sects: [],
    reverts: [],
    hijabs: [],
    halals: [],
    prays: [],
    qurans: [],
  });

  useEffect(() => {
    setFilterContext(filterRules);
  }, [filterRules]);

  let handleSliderChange = (e) => {
    setSliderValue(parseInt(e.target.value, 10));
  };

  //Send Slider Value Globally
  useEffect(() => {
    setRangeContext(sliderValue);
    rangeInputRef.current.value = sliderValue + " MILES";
  }, [sliderValue]);

  /*-------------^^^^^^^^^-------------------*/
  return (
    <div className="filters-parent-result">
      <div className="filters-heading-result">Filters</div>
      <div className="filters-sub-result">Search By Location</div>

      {/* Input for masjid filter*/}
      <input
        className="filters-location-result"
        ref={rangeInputRef}
        placeholder="City, post code, region, area, etc"
      />

      <input
        type="range"
        name="region-slider"
        className="region-slider"
        min="0"
        max="7000"
        value={sliderValue}
        step="1"
        onChange={handleSliderChange}
      />
      <div className="region-slider-labels">
        <div>0 Miles</div>
        <div>7000 Miles</div>
      </div>

      <div className="filters-line2-result"></div>
      {/* <div className="options-heading-result">Options</div> */}

      <div className="checkbox-container-option-result">
        {/*
        <div className="checkbox-option-result">
          <div>
            <input type="checkbox" />
            Viewed
          </div>
          <div className="option2-check-result">
            <input type="checkbox" />
            Viewed Me
          </div>
        </div>
        <div className="checkbox-option-result-2">
          <div>
            <input type="checkbox" />
            Favorited
          </div>
          <div className="option2-check-result2">
            <input type="checkbox" />
            Favorited Me
          </div>
        </div>
        <div className="checkbox-option-result-2">
          <div>
            <input type="checkbox" />
            Pictures
          </div>
          <div className="option2-check-result3">
            <input type="checkbox" />
            Has A Wali
          </div>
        </div> */}
        <div className="personalInfo-head-filter-result">
          Personal Information
        </div>

        {/* Drop Down menu for ethnicity */}
        <div className="dropdown-result">
          <label for="touch">
            <div
              className="title-dropdown-resut"
              onClick={() => {
                setEthnicity(!ethnicity);
              }}
            >
              Ethnicity
            </div>
          </label>
          <input type="checkbox" id="touch" />
          <div>
            {ethnicity ? (
              <div className="slide-dropdown-result">
                {ethnicities.map((inc, index) => (
                  <div className="check-container-personal-result" key={index}>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const selectedEthnicity = inc.toLowerCase();

                        if (e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            ethnicities: [
                              ...filterRules.ethnicities,
                              selectedEthnicity,
                            ],
                          });
                        }
                        if (!e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            ethnicities: filterRules.ethnicities.filter(
                              (item) => item !== selectedEthnicity
                            ),
                          });
                        }
                      }}
                    />
                    <span className="personal-check-result">{inc}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {/* Drop Down menu for body type */}
        <div className="seprator-filter-result"></div>
        <div className="dropdown-result2">
          <label for="touch">
            <div
              className="title-dropdown-resut"
              onClick={() => {
                setBody(!body);
              }}
            >
              Body Type
            </div>
          </label>
          <input type="checkbox" id="touch" />
          <div>
            {body ? (
              <div className="slide-dropdown-result">
                {bodytype.map((inc, index) => (
                  <div className="check-container-personal-result" key={index}>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const selectedBody = inc.toLowerCase();

                        if (e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            bodytype: [...filterRules.bodytype, selectedBody],
                          });
                        }
                        if (!e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            bodytype: filterRules.bodytype.filter(
                              (item) => item !== selectedBody
                            ),
                          });
                        }
                      }}
                    />
                    <span className="personal-check-result">{inc}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        {/* Drop Down menu for income */}
        <div className="seprator-filter-result"></div>
        <div className="seprator-filter-result2"></div>
        <div className="dropdown-result2">
          <label for="touch">
            <div
              className="title-dropdown-resut"
              onClick={() => {
                setIncomes(!incomes);
              }}
            >
              Income
            </div>
          </label>
          <input type="checkbox" id="touch" />
          <div>
            {incomes ? (
              <div className="slide-dropdown-result">
                {income.map((inc, index) => (
                  <div className="check-container-personal-result" key={index}>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const selectedIncome = inc.toLowerCase();

                        if (e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            income: [...filterRules.income, selectedIncome],
                          });
                        }
                        if (!e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            income: filterRules.income.filter(
                              (item) => item !== selectedIncome
                            ),
                          });
                        }
                      }}
                    />
                    <span className="personal-check-result">{inc}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {/* Drop Down menu for marital */}
        <div className="seprator-filter-result"></div>
        <div className="dropdown-result2">
          <label for="touch">
            <div
              className="title-dropdown-resut"
              onClick={() => {
                setMarital(!marital);
              }}
            >
              Marital
            </div>
          </label>
          <input type="checkbox" id="touch" />
          <div>
            {marital ? (
              <div className="slide-dropdown-result">
                {maritalStatus.map((inc, index) => (
                  <div className="check-container-personal-result" key={index}>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const selectedMarital = inc.toLowerCase();
                        if (e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            maritalStatus: [
                              ...filterRules.maritalStatus,
                              selectedMarital,
                            ],
                          });
                        }
                        if (!e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            maritalStatus: filterRules.maritalStatus.filter(
                              (item) => item !== selectedMarital
                            ),
                          });
                        }
                      }}
                    />
                    <span className="personal-check-result">{inc}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {/* Drop Down menu for smoking */}
        <div className="seprator-filter-result"></div>
        <div className="dropdown-result2">
          <label for="touch">
            <div
              className="title-dropdown-resut"
              onClick={() => {
                setSmoke(!smoke);
              }}
            >
              Smoke
            </div>
          </label>
          <input type="checkbox" id="touch" />
          <div>
            {smoke ? (
              <div className="slide-dropdown-result">
                {smoking.map((inc, index) => (
                  <div className="check-container-personal-result" key={index}>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const selectedSmoke = inc.toLowerCase();
                        if (e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            smoking: [...filterRules.smoking, selectedSmoke],
                          });
                        }
                        if (!e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            smoking: filterRules.smoking.filter(
                              (item) => item !== selectedSmoke
                            ),
                          });
                        }
                      }}
                    />
                    <span className="personal-check-result">{inc}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {/* Drop Down menu for drinking */}
        <div className="seprator-filter-result"></div>
        <div className="dropdown-result2">
          <label for="touch">
            <div
              className="title-dropdown-resut"
              onClick={() => {
                setDrink(!drink);
              }}
            >
              Drink
            </div>
          </label>
          <input type="checkbox" id="touch" />
          <div>
            {drink ? (
              <div className="slide-dropdown-result">
                {drinking.map((inc, index) => (
                  <div className="check-container-personal-result" key={index}>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const selectedDrink = inc.toLowerCase();
                        if (e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            drinking: [...filterRules.drinking, selectedDrink],
                          });
                        }
                        if (!e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            drinking: filterRules.drinking.filter(
                              (item) => item !== selectedDrink
                            ),
                          });
                        }
                      }}
                    />
                    <span className="personal-check-result">{inc}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {/* Drop Down menu for Phone */}
        <div className="seprator-filter-result"></div>
        <div className="dropdown-result2">
          <label for="touch">
            <div
              className="title-dropdown-resut"
              onClick={() => {
                setPhones(!phones);
              }}
            >
              Phone
            </div>
          </label>
          <input type="checkbox" id="touch" />
          <div>
            {phones ? (
              <div className="slide-dropdown-result">
                {phone.map((inc, index) => (
                  <div className="check-container-personal-result" key={index}>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const selectedPhone = inc.toLowerCase();
                        if (e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            phone: [...filterRules.phone, selectedPhone],
                          });
                        }
                        if (!e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            phone: filterRules.phone.filter(
                              (item) => item !== selectedPhone
                            ),
                          });
                        }
                      }}
                    />
                    <span className="personal-check-result">{inc}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="seprator-filter-result"></div>

        {/*---------------------Religon Section Starts------------------- */}
        <div className="religon-head-filter-result">Religon</div>
        <div className="dropdown-result">
          <label for="touch">
            <div
              className="title-dropdown-resut"
              onClick={() => {
                setReligon(!religon);
              }}
            >
              Religiousness
            </div>
          </label>
          <input type="checkbox" id="touch" />
          <div>
            {religon ? (
              <div className="slide-dropdown-result">
                {religiousness.map((inc, index) => (
                  <div className="check-container-personal-result" key={index}>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const selectedReligon = inc.toLowerCase();
                        if (e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            religiousness: [
                              ...filterRules.religiousness,
                              selectedReligon,
                            ],
                          });
                        }
                        if (!e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            religiousness: filterRules.religiousness.filter(
                              (item) => item !== selectedReligon
                            ),
                          });
                        }
                      }}
                    />
                    <span className="personal-check-result">{inc}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {/* Drop Down menu for Sects */}
        <div className="seprator-filter-result"></div>
        <div className="dropdown-result2">
          <label for="touch">
            <div
              className="title-dropdown-resut"
              onClick={() => {
                setSect(!sect);
              }}
            >
              Sect
            </div>
          </label>
          <input type="checkbox" id="touch" />
          <div>
            {sect ? (
              <div className="slide-dropdown-result">
                {sects.map((inc, index) => (
                  <div className="check-container-personal-result" key={index}>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const selectedSect = inc.toLowerCase();
                        if (e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            sects: [...filterRules.sects, selectedSect],
                          });
                        }
                        if (!e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            sects: filterRules.sects.filter(
                              (item) => item !== selectedSect
                            ),
                          });
                        }
                      }}
                    />
                    <span className="personal-check-result">{inc}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        {/* Drop Down menu for revert */}
        <div className="seprator-filter-result"></div>
        <div className="seprator-filter-result2"></div>
        <div className="dropdown-result2">
          <label for="touch">
            <div
              className="title-dropdown-resut"
              onClick={() => {
                setRevert(!revert);
              }}
            >
              Revert
            </div>
          </label>
          <input type="checkbox" id="touch" />
          <div>
            {revert ? (
              <div className="slide-dropdown-result">
                {reverts.map((inc, index) => (
                  <div className="check-container-personal-result" key={index}>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const selectedRevert = inc.toLowerCase();
                        if (e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            reverts: [...filterRules.reverts, selectedRevert],
                          });
                        }
                        if (!e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            reverts: filterRules.reverts.filter(
                              (item) => item !== selectedRevert
                            ),
                          });
                        }
                      }}
                    />
                    <span className="personal-check-result">{inc}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {/* Drop Down menu for hijab */}
        <div className="seprator-filter-result"></div>
        <div className="dropdown-result2">
          <label for="touch">
            <div
              className="title-dropdown-resut"
              onClick={() => {
                setHijab(!hijab);
              }}
            >
              Hijab
            </div>
          </label>
          <input type="checkbox" id="touch" />
          <div>
            {hijab ? (
              <div className="slide-dropdown-result">
                {hijabs.map((inc, index) => (
                  <div className="check-container-personal-result" key={index}>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const selectedHijab = inc.toLowerCase();
                        if (e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            hijabs: [...filterRules.hijabs, selectedHijab],
                          });
                        }
                        if (!e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            hijabs: filterRules.hijabs.filter(
                              (item) => item !== selectedHijab
                            ),
                          });
                        }
                      }}
                    />
                    <span className="personal-check-result">{inc}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {/* Drop Down menu for halal */}
        <div className="seprator-filter-result"></div>
        <div className="dropdown-result2">
          <label for="touch">
            <div
              className="title-dropdown-resut"
              onClick={() => {
                setHalal(!halal);
              }}
            >
              Halal
            </div>
          </label>
          <input type="checkbox" id="touch" />
          <div>
            {halal ? (
              <div className="slide-dropdown-result">
                {halals.map((inc, index) => (
                  <div className="check-container-personal-result" key={index}>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const selectedHalal = inc.toLowerCase();
                        if (e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            halals: [...filterRules.halals, selectedHalal],
                          });
                        }
                        if (!e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            halals: filterRules.halals.filter(
                              (item) => item !== selectedHalal
                            ),
                          });
                        }
                      }}
                    />
                    <span className="personal-check-result">{inc}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {/* Drop Down menu for Praying */}
        <div className="seprator-filter-result"></div>
        <div className="dropdown-result2">
          <label for="touch">
            <div
              className="title-dropdown-resut"
              onClick={() => {
                setPray(!pray);
              }}
            >
              Praying
            </div>
          </label>
          <input type="checkbox" id="touch" />
          <div>
            {pray ? (
              <div className="slide-dropdown-result">
                {prays.map((inc, index) => (
                  <div className="check-container-personal-result" key={index}>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const selectedPray = inc.toLowerCase();
                        if (e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            prays: [...filterRules.prays, selectedPray],
                          });
                        }
                        if (!e.target.checked) {
                          setFilterRules({
                            ...filterRules,
                            prays: filterRules.prays.filter(
                              (item) => item !== selectedPray
                            ),
                          });
                        }
                      }}
                    />
                    <span className="personal-check-result">{inc}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {/* Drop Down menu for quran */}
        {/* <div className="seprator-filter-result"></div>
        <div className="dropdown-result2">
          <label for="touch">
            <div
              className="title-dropdown-resut"
              onClick={() => {
                setQuran(!quran);
              }}
            >
              Reading Quran
            </div>
          </label>
          <input type="checkbox" id="touch" />
          <div>
            {quran ? (
              <div className="slide-dropdown-result">
                {qurans.map((inc, index) => (
                  <div className="check-container-personal-result" key={index}>
                    <input
                      type="checkbox"
                      onChange={() => {
                        const selectedReligon = inc.toLowerCase();
                        setFilterContext((prevFilterContext) => {
                          if (
                            prevFilterContext.religon_religious ===
                            selectedReligon
                          ) {
                            // If the checkbox is already selected, remove the key
                            const { religon_religious, ...rest } =
                              prevFilterContext;
                            return rest;
                          } else {
                            // If the checkbox is selected, add the key
                            return {
                              ...prevFilterContext,
                              religon_religious: selectedReligon,
                            };
                          }
                        });
                      }}
                    />
                    <span className="personal-check-result">{inc}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
}
