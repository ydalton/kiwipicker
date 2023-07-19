function Station(props) {
  return (
    <a href={props.link}
      title={props.text}
      onClick={props.onclick}
      className="station text-center col-11 col-lg-2 p m-2">
      <p>
        {props.text}
      </p>
    </a>
  );
}

export default Station;
