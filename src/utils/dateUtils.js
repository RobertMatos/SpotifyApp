import moment from "moment";

export function formatDate(date) {
  return moment(date).format("YYYY");
}

export function formatTime(time) {
  const mins = Math.floor(time / 60000);
  const segs = ((time % 60000) / 1000).toFixed(0);
  return `${mins}:${segs < 10 ? "0" : ""}${segs}`;
}