import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateEvent, deleteEvent } from "../slices/events";
import EventDataService from "../services/event.service";

const Event = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialEventState = {
    id: null,
    title: "",
    description: "",
    date: "",
    city_id: null,
    participants: "",
  };
  const [currentEvent, setCurrentEvent] = useState(initialEventState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getEvent = (id) => {
    EventDataService.get(id)
      .then((response) => {
        setCurrentEvent(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getEvent(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentEvent({ ...currentEvent, [name]: value });
  };
  /*
  const currentEventData = {
    id: currentEvent.id,
    title: currentEvent.title,
    description: currentEvent.description,
    date: currentEvent.date,
    city_id: currentEvent.city_id,
    participants: currentEvent.participants,
  };
*/
  const updateContent = () => {
    dispatch(updateEvent({ id: currentEvent.id, data: currentEvent }))
      .unwrap()
      .then((response) => {
        console.log(response);
        setMessage("The event was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeEvent = () => {
    dispatch(deleteEvent({ id: currentEvent.id }))
      .unwrap()
      .then(() => {
        navigate("/user");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentEvent ? (
        <div className="edit-form">
          <h4>Event</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentEvent.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentEvent.description}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={removeEvent}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on an Event...</p>
        </div>
      )}
    </div>
  );
};

export default Event;
