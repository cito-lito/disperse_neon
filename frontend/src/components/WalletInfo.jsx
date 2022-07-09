const WalletInfo = ({ address, provider }) => {
  return (
    <div className="pt-16">
      {/* <h3 className="text-2xl font-light italic">connect to wallet</h3> */}
      <h4 className="text-2xl font-light italic">connected: {address}</h4>
    </div>
  );
};

export default WalletInfo;
