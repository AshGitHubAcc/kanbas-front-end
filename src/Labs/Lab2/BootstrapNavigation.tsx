export default function BootstrapNavigation() {
    return (
<div id="wd-css-navigating-with-cards">
  <h2>
    Cards
  </h2>
  <div className="card"
       style={{ width: "18rem" }}>
    <img src="images/reactjs.jpg" alt="ReactJS"
         className="card-img-top" />
    <div className="card-body">
      <h5 className="card-title">
          Stacking Starship
      </h5>
      <p className="card-text">
        Stacking the most powerful rocket in history. Mars or bust!
      </p>
      <a href="#/Labs/Lab2" className="btn btn-primary">
        Boldly Go
      </a>
    </div>
  </div>
</div>
    );
}
