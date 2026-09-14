import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CountdownTimer from "../UI/CountdownTimer";

const ExploreItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);
  const [loading, setLoading] = useState(true);

  const displayItems = newItems.slice(0, visibleItems);

  async function DynamicNewItems() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
    );
    setNewItems(data);
    setLoading(false);
  }
  async function handleFilterChange(event) {
    const filterValue = event.target.value;
    setLoading(true);
    if (filterValue === "price_low_to_high") {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_low_to_high",
      );
      setNewItems(data);
      setLoading(false);
    }
    if (filterValue === "price_high_to_low") {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=price_high_to_low",
      );
      setNewItems(data);
      setLoading(false);
    }
    if (filterValue === "likes_high_to_low") {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low",
      );
      setNewItems(data);
      setLoading(false);
    }
  }

  useEffect(() => {
    DynamicNewItems();
  }, []);

  const handleLoadMore = () => {
    setVisibleItems((prevCount) => prevCount + 4);
  };

  return (
    <>
      <div data-aos="fade-in" data-aos-delay="300">
        <select id="filter-items" defaultValue="" onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        <div className="row">
          {Array.from({ length: visibleItems }).map((_, i) => (
            <div key={i} className="col-lg-3 col-md-6 col-sm-6 col-xs-12" >
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
      ) : (
        displayItems.map((Item, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
            data-aos="fade-in"
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${Item.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={Item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {Item.expiryDate && (
                <CountdownTimer expiryDate={Item.expiryDate} />
              )}

              <div className="nft__item_wrap">
                
                <Link to={`/item-details/${Item.nftId}`}>
                  <img
                    src={Item.nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to={`/item-details/${Item.nftId}`}>
                  <h4>{Item.title}</h4>
                </Link>
                <div className="nft__item_price">{Item.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{Item.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="col-md-12 text-center">
        {visibleItems < newItems.length && (
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={handleLoadMore}
          >
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
