import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "../Page.css";
import NoImage from "../../assets/NoImage.png";

export default function Home() {
  
  const [Event, setEvent] = useState("");
  const [Category, setCategory] = useState("");
  const [HasMore, setHasMore] = useState(true);
  const [Offset, setOffset] = useState(10);

  const [Refine, setRefine] = useState("");
  const [Location, setLocation] = useState("");
  const [SearchLocation, setSearchLocation] = useState("");

  const [FacetValue, setFacetValue] = useState("");

  const [CheckEmpty, setCheckEmpty] = useState(false);
  const [CheckDropDown, setCheckDropDown] = useState(false);
  const [Accept, setAccept] = useState(false);
  const fetchRecord = async () => {
    console.log(`${FacetValue ? FacetValue : ""}`)
    await axios
      .get(
        `https://public.opendatasoft.com/api/v2/catalog/datasets/evenements-publics-cibul/records?limit=10&offset=0${
          Refine ? "&refine=tags%3A" + Refine : ""
        }${FacetValue ? FacetValue : ""}`
      )
      .then((res) => {
        // console.log(res.data);
        console.log(res.data.records);
        if (res.data.records.length === 0) {
          // console.log("abc");
          setCheckEmpty(true);
        }
        setEvent(res.data.records);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Refine, FacetValue]);

  const fetchFacetCategory = async () => {
    await axios
      .get(
        "https://public.opendatasoft.com/api/v2/catalog/datasets/evenements-publics-cibul/facets"
      )
      .then((res) => {
        console.log(res.data.facets);
        setCategory(res.data.facets[0].facets);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchFacetCategory();
  }, []);

  const fethMoreEvent = async () => {
    const MoreEvent = axios.get(
      `https://public.opendatasoft.com/api/v2/catalog/datasets/evenements-publics-cibul/records?limit=10&offset=${Offset}${
        Refine ? "&refine=tags%3A" + Refine : ""
      }${FacetValue ? FacetValue : ""}`
    );
    return MoreEvent;
  };

  const fetchData = async () => {
    const MoreEvent = await fethMoreEvent();
    // console.log([...Event, ...MoreEvent.data.records]);
    setEvent([...Event, ...MoreEvent.data.records]);

    if (MoreEvent.length === 0 || MoreEvent.length < 10) {
      setHasMore(false);
    }

    setOffset(Offset + 10);
  };

  const fetchLocation = async () => {
    await axios
      .get(
        "https://public.opendatasoft.com/api/v2/catalog/datasets/evenements-publics-cibul/facets?facet=placename&facet=department&facet=region&facet=city&timezone=UTC"
      )
      .then((res) => {
        // console.log(res.data.facets);
        setLocation(res.data.facets);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const CompleteSearch = (Refine, Search) => {
    setSearchLocation(Search);
    setFacetValue(Refine);

    setAccept(Search);
    setCheckDropDown(true);
  };
  useEffect(() => {
    if (Accept === SearchLocation) {
      // console.log("oui");
    } else {
      setCheckDropDown(false);
      // console.log("non");
    }
  }, [SearchLocation, Accept]);

  return (
    <div>
      <div className="content">
        <div className="menu">
          <h1>Filtres</h1>

          {Category ? (
            <div>
              <div>
                <select onChange={(e) => setRefine(e.target.value)}>
                  <option value="">Catégories</option>
                  {
                    // eslint-disable-next-line array-callback-return
                    Category.map((category, key) => {
                      if (category.name !== "") {
                        return (
                          <option key={key} value={category.name}>
                            {category.name}
                          </option>
                        );
                      }
                    })
                  }
                </select>
              </div>
              <div className="lieu">
                <input
                  type="text"
                  placeholder="Lieu"
                  value={SearchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
                <div className="LieuDropDown">
                  {CheckDropDown
                    ? null
                    : Location
                    ? Location.map((location) => {
                        return (
                          location.facets
                            // eslint-disable-next-line array-callback-return
                            .filter((name) => {
                              if (SearchLocation === "") {
                                return null;
                              } else if (
                                name.name
                                  .toLowerCase()
                                  .includes(SearchLocation.toLowerCase())
                              ) {
                                return name;
                              }
                            })
                            .map((name, key) => {
                              return (
                                <p
                                  className="pointerHome"
                                  key={key}
                                  onClick={() =>
                                    CompleteSearch(
                                      `&refine=${location.name}%3A${name.name}`,
                                      name.name
                                    )
                                  }
                                >
                                  {name.name}
                                </p>
                              );
                            })
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {Event ? (
          <div>
            <InfiniteScroll
              dataLength={Event.length} //This is important field to render the next data
              next={fetchData}
              hasMore={HasMore}
              loader={CheckEmpty ? <p>Pas de résultat</p> : <h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <div className="bodyHome">
                <h1 className="titleH1">Events à venir</h1>

                {Event.map((event, key) => (
                  <div key={key} className="event">
                    <div className="InfoEvent">
                      <div className="photo">
                        {event.record.fields.image ? (
                          <img
                            className="imageHome"
                            src={event.record.fields.image}
                            alt={event.record.fields.title}
                          />
                        ) : (
                          <img
                            className="imageHome"
                            src={NoImage}
                            alt="no_image"
                          />
                        )}
                      </div>
                      <div className="description">
                        <h1> {event.record.fields.title}</h1>
                        {event.record.fields.free_text ? (
                          <p>{event.record.fields.free_text}</p>
                        ) : (
                          <p>{event.record.fields.description}</p>
                        )}
                        <Link to={"/event/" + event.record.id}>
                          En savoir +
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </InfiniteScroll>
          </div>
        ) : null}
      </div>
    </div>
  );
}
