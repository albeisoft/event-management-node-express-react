import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import EventDataService from "../services/evemt.service";

const initialState = [];
// "user" route is after login access create event action
export const createEvent = createAsyncThunk(
  "user/create",
  async ({ title, description, city_id, date, participants }) => {
    const res = await EventDataService.create({
      title,
      description,
      city_id,
      date,
      participants,
    });
    return res.data;
  }
);

export const retrieveEvents = createAsyncThunk("event/retrieve", async () => {
  const res = await EventDataService.getAll();
  return res.data;
});
// user after login  - area where events are all listed
export const updateEvent = createAsyncThunk(
  "user/update",
  async ({ id, data }) => {
    const res = await EventDataService.update(id, data);
    return res.data;
  }
);

export const deleteEvent = createAsyncThunk("user/delete", async ({ id }) => {
  await EventDataService.remove(id);
  return { id };
});

export const findByCityIdAndDateRange = createAsyncThunk(
  "user/findByCityIdAndDate",
  async ({ city_id, startDate, endDate }) => {
    const res = await EventDataService.findByCityIdAndDateRange(
      city_id,
      startDate,
      endDate
    );
    return res.data;
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState,
  extraReducers: {
    [createEvent.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveEvents.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateEvent.fulfilled]: (state, action) => {
      const index = state.findIndex((event) => event.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteEvent.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },

    [findByCityIdAndDateRange.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = eventSlice;
export default reducer;
