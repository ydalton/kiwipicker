function Button(props) {
  return(
    <div className="button mx-1">
      <p className="text-center">
        <a href="/">
          {props.icon}
        </a>
      </p>
    </div>
  );
}

function Bar() {
  return(
    <div className="bar col-3 position-absolute p-2">
        <Button icon="+"/>
        <Button icon="-"/>
    </div>
  );
}

export default Bar;
