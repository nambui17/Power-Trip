module.exports = {
  formatDate: (date) => {
    const nD = new Date(date);
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const dateString = `${monthNames[nD.getMonth()]} ${nD.getDate()}, ${nD.getFullYear()}`;
    return dateString;
  },
};
