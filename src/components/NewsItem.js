import React from "react";

const NewsItem = (props) => {
  let { title, description, newsurl, imageUrl, author, date } = props;
  return (
    <div>
      <div className="card" style={{}}>
        <img
          src={
            !imageUrl
              ? "https://cdn.vox-cdn.com/thumbor/AzUxs8UmwIY2lOByn5LIX8geWjY=/0x0:2200x1650/1200x628/filters:focal(1100x825:1101x826)/cdn.vox-cdn.com/uploads/chorus_asset/file/24835037/PayPal_stablecoin.png"
              : imageUrl
          }
          style={{ height: "10rem" }}
          className="card-img-top  "
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-body-secondary">
              Author: {author ? author : "Anonymous"} Published on:{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a href={newsurl} target="_blank" className="btn btn-primary btn-sm">
            Read more..
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
