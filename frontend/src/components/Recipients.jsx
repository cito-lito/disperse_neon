const Recipients = ({ tokenSymbol, textValue, setTextValue }) => {
  return (
    <div className="pt-16">
      <h3 className="text-2xl font-light italic">recipients and amounts</h3>
      <h5 className="text-2xl font-light italic">
        enter one address and the desired amount on each line
      </h5>
      <textarea
        spellCheck="false"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        className="block border-b-2 border-black outline-none px-2 py-2 mt-4 h-32"
        style={{
          width: "100%",
          background: "aquamarine",
          color: "black",
        }}
        placeholder="0x2b1F577230F4D72B3818895688b66abD9701B4dC=1.41421"
        // 0x2b1F577230F4D72B3818895688b66abD9701B4dC 1.41421
        // 0x2b1F577230F4D72B3818895688b66abD9701B4dC,1.41421"
      ></textarea>
    </div>
  );
};

export default Recipients;
