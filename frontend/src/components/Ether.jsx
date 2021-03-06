import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";

import Disperse from "../artifacts/Disperse.json";
import { parseText } from "../utils/index";
import Recipients from "./Recipients";
import ConfirmEther from "./ConfirmEther";
import { NetworkContext } from "../App";
import { disperseAddresses } from "../utils/constants";

const Ether = ({ address }) => {
  const [ethBalance, setEthBalance] = useState(null);
  const [textValue, setTextValue] = useState("");
  const [total, setTotal] = useState(null);
  const [recipientsData, setRecipientsData] = useState([]);
  const [remaining, setRemaining] = useState(null);
  const { chainId } = useContext(NetworkContext);
  const [txStatus, setTxStatus] = useState(null);

  const getEthBalance = async () => {
    const { ethereum } = window;
    if (!ethBalance) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      let ethBalance = await provider.getBalance(address);
      ethBalance = ethers.utils.formatEther(ethBalance);
      setEthBalance(ethBalance);
    }
  };

  useEffect(() => {
    getEthBalance();
  }, []);

  useEffect(() => {
    setRecipientsData(parseText(textValue));
  }, [textValue]);

  useEffect(() => {
    if (recipientsData.length > 0) {
      let newTotal = recipientsData[0].value;
      for (let i = 1; i < recipientsData.length; i++) {
        newTotal = newTotal.add(recipientsData[i].value);
      }
      setTotal(newTotal);
    } else {
      setTotal(null);
    }
  }, [recipientsData]);

  const disperseNEON = async () => {
    try {
      setTxStatus(null);
      const { ethereum } = window;
      if (ethereum && disperseAddresses[chainId]) {
      console.log("Hi ");
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const disperseContract = new ethers.Contract(
          disperseAddresses[chainId],
          Disperse.abi,
          signer
        );

        const recipients = recipientsData.map((recipient) => recipient.address);
        const values = recipientsData.map((recipient) => recipient.value);

        console.log("Dispersing ETH now");
        console.log(total);
        const txn = await disperseContract.disperseNEON(recipients, values, {
          value: total,
        });
        setTxStatus({
          hash: txn.hash,
          status: "pending",
        });
        await txn.wait();
        setTxStatus({
          hash: txn.hash,
          status: "success",
        });
        console.log("Completed dispersing ether");
      }
    } catch (error) {
      console.log("error occured while dispersing ether");
      console.log(error);
    }
  };

  useEffect(() => {
    if (ethBalance && total) {
      const tokenBalance = ethers.utils.parseEther(ethBalance);
      const remaining = tokenBalance.sub(total);
      setRemaining(ethers.utils.formatEther(remaining));
    } else {
      setRemaining(null);
    }
  }, [total]);

  return (
    <h5 className="text-2xl font-light italic">
      <br></br>
      you have {ethBalance} <span className="pt-1 text-sm">NEON</span>
      <Recipients
        textValue={textValue}
        setTextValue={setTextValue}
        tokenSymbol={"ETH"}
      />
      {recipientsData.length > 0 && (
        <ConfirmEther
          recipientsData={recipientsData}
          total={total}
          disperse={disperseNEON}
          tokenBalance={ethBalance}
          remaining={remaining}
          txStatus={txStatus}
        />
      )}
    </h5>
  );
};

export default Ether;
