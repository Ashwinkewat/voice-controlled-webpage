export default function Navbar({ show }) {
  return (
    <div className={`navbar ${show ? "show" : ""}`}>
      <a href="#change">Change Background</a>
      <a href="#default">Default</a>
      <a href="#show image">Show image</a>
      <a href="#hide image">Hide image</a>
      <a href="#give advice">Give advice</a>
      <a href="#change text">Change text</a>
    </div>
  );
}
