export default function ControlButtons({ onStart, onStop }) {
  return (
    <div className="button-container">
      <button className="button1"  onClick={onStart}>🎤 Start Listening</button>
      <button className="button1"  onClick={onStop}>🛑 Stop Listening</button>
    </div>
  );
}
