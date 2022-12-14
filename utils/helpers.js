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
  transform: (url) => {
    const spl = url.split('upload/');
    const newstring = spl[0] + 'upload/c_limit/' + spl[1];
    return newstring;
  }
};
