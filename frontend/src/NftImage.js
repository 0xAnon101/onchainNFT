import React from "react";

const NftImage = (props) => {
  return (
    <div className="nft-image-wrapper">
      <div className="total-nft">NFTs available: {props.totalNFT}/50</div>
      <div className="user-minted-nft">You've Minted: {props.userMinted}</div>
      <div className="nft-image">
        {props.base64Image && <img src={props.base64Image} alt={"nft"} />}
      </div>
    </div>
  );
};

export default NftImage;
