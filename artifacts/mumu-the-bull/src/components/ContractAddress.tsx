import { Check, Copy } from "lucide-react";
import React, { useState } from "react";

const ContractAddress = () => {
  const [copied, setCopied] = useState(false);
  const contractAddress = "5LafQUrVco6o7KMz42eqVEJ9LW31StPyGjeeu5sKoMtA";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group relative animate-wiggle shadow-container bg-white h-[74px] w-full max-w-[300px] flex flex-col p-4 rounded-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
    >
      <div className="absolute -top-8 right-0 pointer-events-none">
        <svg
          width="129"
          height="24"
          viewBox="0 0 129 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mix-blend-difference bg-blend-difference"
        >
          <title>Click to Open</title>
          <path
            d="M3.56356 22.3928C4.15004 22.1472 6.33192 20.642 8.40124 19.4933C8.80082 19.2747 9.18824 19.021 10.0308 18.6553C10.8733 18.2896 12.159 17.8197 13.4835 17.3356"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="flex items-center justify-between w-full">
        <span className="text-black/60 font-nerko text-sm">
          Contract Address
        </span>
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4 text-black/40 group-hover:text-black/60 transition-colors" />
        )}
      </div>
      <p
        className={`w-[250px] text-base whitespace-nowrap overflow-hidden text-ellipsis font-nerko transition-colors duration-300 ${
          copied ? "text-green-600" : "text-black"
        }`}
      >
        {contractAddress}
      </p>

      {copied && (
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-nerko text-green-600">
          Copied!
        </span>
      )}
    </button>
  );
};

export default ContractAddress;
