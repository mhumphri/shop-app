import PortfolioItem from "./portfolioItem";
import itemArray from "../../data/itemArray";
import "../css/portfolioList.css";

function PortfoiloList() {
  return (
    <div className="portfoliolist-yu1">
      <div className="portfoliolist-ap7">
        <div className="portfoliolist-pp6">
          {itemArray.map((x) => (
            <PortfolioItem name={x.name} href={x.href} modal={x.modal} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PortfoiloList;
