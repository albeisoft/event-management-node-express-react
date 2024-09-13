module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define("events", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATEONLY, // DATE include TIMESTAMP WITH TIME ZONE and DATEONLY is only TIMESTAMP without TIME ZONE
    },
    city_id: {
      type: Sequelize.INTEGER,
    },
    participants: {
      // in future can be update that participants id list to be saved in a table event_participants with rows participant_id, event_id (like table user_roles to set roles to user)
      // on front end to send an array of participants id's for current event id to database from an dropdown list with multiselection option

      type: Sequelize.STRING,
    },
  });

  return Event;
};
