import moment from 'moment';

export const convertTimestamp = (timestamp, format='MMM D, YYYY; h:mm a') => {
  const t = timestamp.split(/[- :]/); // split timestamp into [ Y, M, D, h, m, s ]
  const d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));

  return moment(d).format(format);
};

const twoDigits = (d) => {
  if(0 <= d && d < 10) return "0" + d.toString();
  if(-10 < d && d < 0) return "-0" + (-1*d).toString();
  return d.toString();
};

export const getMySQLTimestamp = () => {
  const d = new Date();
  return d.getUTCFullYear() + "-" + twoDigits(1 + d.getUTCMonth()) + "-" + twoDigits(d.getUTCDate()) + " " + twoDigits(d.getUTCHours()) + ":" + twoDigits(d.getUTCMinutes()) + ":" + twoDigits(d.getUTCSeconds());
};
