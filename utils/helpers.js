module.exports = {
  sameUser: (user) => {
    if (user === req.session.user_id) {
      return true;
    } else {
      return false;
    }
  },
};
