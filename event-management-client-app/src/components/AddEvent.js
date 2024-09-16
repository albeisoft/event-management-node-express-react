import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createEvent } from "../slices/events";

const AddEvent = () => {
  const initialEventState = {
    id: null,
    title: "",
    description: "",
    date: "",
    city_id: null,
    participants: "",
  };
  const [eventOk, setEvent] = useState(initialEventState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEvent({ ...eventOk, [name]: value });
  };

  const saveEvent = () => {
    const { title, description, date, city_id, participants } = eventOk;

    dispatch(createEvent({ title, description, date, city_id, participants }))
      .unwrap()
      .then((data) => {
        console.log(data);
        setEvent({
          id: data.id,
          title: data.title,
          description: data.description,
          date: data.date,
          city_id: data.city_id,
          participants: data.participants,
        });
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newEvent = () => {
    setEvent(initialEventState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newEvent}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={eventOk.title || ""}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={eventOk.description || ""}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              required
              value={eventOk.date || ""}
              onChange={handleInputChange}
              name="date"
            />
          </div>
          //-- todo Dropdown
          <Dropdown
            name="city_id"
            options={cities}
            onChange={this.handleSelectCity}
            value={selectedCity}
            placeholder="Select an option"
          />
          //----
          <div className="form-group">
            <label htmlFor="participants">Participants</label>
            <input
              type="text"
              className="form-control"
              id="participants"
              required
              value={eventOk.participants || ""}
              onChange={handleInputChange}
              name="participants"
            />
          </div>
          <button onClick={saveEvent} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddEvent;
