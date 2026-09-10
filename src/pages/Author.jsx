import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Author = () => {
  const [creator, setCreator] = useState([]);
  const [loading, setLoading] = useState(true);
  const {authorId} = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

async function DynamicAuthors() {
  const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`);

  setCreator(data);
}

const toggleFollow = () => {
  if (isFollowing) {
    setCreator((prevCreator) => ({
    ...prevCreator,
    followers: prevCreator.followers - 1,
  }));
  setIsFollowing(false);
} else {
  setCreator((prevCreator) => ({
    ...prevCreator,
    followers: prevCreator.followers + 1,
  }));
  setIsFollowing(true);
}}

useEffect(() => {
  DynamicAuthors();
}, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={creator.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {creator.authorName}
                          <span className="profile_username">{creator.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {creator.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{creator.followers} followers</div>
                      <Link to="#" className="btn-main" onClick={toggleFollow}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems ppimg= {creator?.authorImage} nftCollection={creator?.nftCollection} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
