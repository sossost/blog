const useTimestamp = (props) => {
  const timestamp = props;
  const date = new Date(timestamp);

  const year = date.getFullYear().toString().slice(-4);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);
  const second = ("0" + date.getSeconds()).slice(-2);

  return <span>{`${year}.${month}.${day} ${hour}:${minute}`}</span>;
};

export default useTimestamp;
