import React from "react";
import { Link } from "react-router-dom";


const AuthorItems = ({ nftCollection, ppimg }) => {

const dataLoaded = nftCollection && nftCollection.length > 0;

  return !dataLoaded ? (
    <div className="row">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
          <div className="nft__item skeleton-grid">
            <div className="author_list_pp skeleton-circle"></div>
            <div className="nft__item_wrap skeleton-box"></div>
            <div className="nft__item_info">
              <div className="nft__item_info h4 skeleton-line short"></div>
              <div className="nft__item_price skeleton-line tiny"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ):(
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {nftCollection.map((nft, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to="">
                    <img className="lazy" src={ppimg} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="nft__item_wrap">
                  
                  <Link to={`/item-details/${nft.nftId}`}>
                    <img
                      src={nft.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${nft.nftId}`}>
                    <h4>{nft.title}</h4>
                  </Link>
                  <div className="nft__item_price">{nft.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{nft.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
