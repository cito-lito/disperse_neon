import { useContext } from "react";
import { NetworkContext } from "../App";
import EthereumSVG from "../assets/ethereum.svg";
//import Neon-logoSGV from "../assets/neon-logo.sgv";
const Header = ({ address }) => {
  const networkContext = useContext(NetworkContext);
  return (
    <div>
      <div className="flex space-between">
        <img
          src={EthereumSVG}
          style={{
            width: "50px",
            height: "50px",
            marginLeft: "-50px",
          }}
          alt="Ethereum SVG"
        />
        <h2 className="mt-8 text-4xl font-light">DISPERSE</h2>
        {address && (
          <span className="text-l pt-2 font-light">
            {networkContext.network || "🤔"}
          </span>
        )}
      </div>
      <div></div>
      <h6 className="text-2xl font-light italic">
        <i></i> distribute NEON or tokens to multiple addresses
      </h6>
    </div>
  );
};

export default Header;
