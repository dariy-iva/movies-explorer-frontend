export default function setDurationInString(minutes) {
  const durationHours = Math.floor(minutes / 60);
  const durationMinutes = minutes - durationHours * 60;
  const durationString =
    minutes < 60
      ? `${minutes}м`
      : `${durationHours}ч ${durationMinutes > 0 ? durationMinutes + "м" : ""}`;
  return durationString;
}
