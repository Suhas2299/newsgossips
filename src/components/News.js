import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  // articles=[]

  const updateNews = async () => {
    console.log("set progress", props.setProgress(10));
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&page=${page}&apiKey=${props.apiKey}&pagesize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    console.log(parsedData);
    props.setProgress(50);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    props.setProgress(100);
  };

  //componentDidMount() is updated by useeffect
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)}-NewsGossips`;
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&page=${
      page + 1
    }&apiKey=5c84c1686b2148f3a614f3dfd6a8834b&pagesize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  console.log("render executed");
  let headline = props.category;

  return (
    <>
      <h2
        className="text-center "
        style={{ margin: "25px 0px", marginTop: "74px" }}
      >
        NewsGossips- Top HeadLines on {capitalizeFirstLetter(headline)}
      </h2>
      {/* {this.state.loading && <Spinner/>} */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4 mt-2" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 40) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 60)
                        : ""
                    }
                    newsurl={element.url}
                    imageUrl={element.urlToImage}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
            ;
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "india",
  pageSize: 8,
  category: "general",
  totalResults: 0,
};
News.propTypes = {
  name: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
