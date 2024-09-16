import http from "../http-common";

const getAll = () => {
  return http.get("/api/event");
};

const get = (id) => {
  return http.get(`/api/event/${id}`);
};

const create = (data) => {
  return http.post("/api/event", data);
};

const update = (id, data) => {
  return http.put(`/api/event/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/api/event/${id}`);
};

const findByCityIdAndDateRange = (city_id, startDate, endDate) => {
  return http.get(
    `/events?city_id=${city_id}&startDate=${startDate}&endDate=${endDate}`
  );
};

const EventService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByCityIdAndDateRange,
};

export default EventService;
