import React from "react";

const NewsItem=(props)=> {
    let { title, description, imageUrl, newsUrl, author, date, source } =props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "22rem" }}>
          <div
            style={{
              display: "flex",
              justifyCcontent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            <span class=" badge rounded-pill bg-danger">{source}</span>
          </div>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://www.hindustantimes.com/ht-img/img/2023/03/21/1600x900/Breaking-News-Live-Blog-pic_1627344775185_1677800210069_1679442306577_1679442306577.jpg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title"> {title!=null? title : "TITLE"}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author} on {date}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More...
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
