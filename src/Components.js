function Station(props) {
  return (
   <div className="station text-center col-11 col-lg-3 p-2 m-2">
      <p><a href={props.link}>{props.text}</a></p>
    </div>
  );
}

export default Station;
