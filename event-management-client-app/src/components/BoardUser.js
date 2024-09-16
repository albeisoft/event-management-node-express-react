import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { retrieveEvents, findEventsByTitle } from "../slices/events";
import { Link } from "react-router-dom";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  //-- Events list

  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const events = useSelector((state) => state.events);
  const dispatch = useDispatch();

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const initFetch = useCallback(() => {
    dispatch(retrieveEvents());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const refreshData = () => {
    setCurrentEvent(null);
    setCurrentIndex(-1);
  };

  const setActiveEvent = (event, index) => {
    setCurrentEvent(event);
    setCurrentIndex(index);
  };

  const findByTitle = () => {
    refreshData();
    dispatch(findEventsByTitle({ title: searchTitle }));
  };

  //-- //

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>

      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Events List</h4>

          <ul className="list-group">
            {events &&
              events.map((event, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveEvent(event, index)}
                  key={index}
                >
                  {event.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentEvent ? (
            <div>
              <h4>Event</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentEvent.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentEvent.description}
              </div>

              <Link
                to={"/user/" + currentEvent.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an Event...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardUser;
