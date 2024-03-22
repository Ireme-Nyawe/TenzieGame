export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  let dots = [];
    for (let i = 0; i < props.value; i++) {
      dots.push(<span key={i} className="dot"></span>);
    }
  return (
    <div className="die-item" style={styles} onClick={props.hold}>
      <h2 className="die-num">
        {dots}
      </h2>
    </div>
  );
}
