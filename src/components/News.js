import React, { Component } from "react";
import NewsItem from "./NewsItem";
import { Spinner } from "./spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "india",
    pageSize: 8,
    category: "general",
    totalResults: 0,
  };
  static propTypes = {
    name: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  // articles=[]
  constructor(props) {
    super(props);
    console.log("i am a constructor from news component  executed");
    this.state = {
      articles: [],
      // when we hardcode the articles,the hardcoded articles will be put in[] line 23 to access that article we use this.article
      // articles:this.articles,
      loading: false,
      page: 1,
    };
    //to use props in constructor we need to take (props) in constructor as well as in super line 26 27
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - News`;
  }

  handleNextClick = async () => {
    //     console.log("next");
    //     if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

    //     console.log("current page" , this.state.page+1 +" "+ "total pages" , Math.ceil(this.state.totalResults/this.props.pageSize) );
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5c84c1686b2148f3a614f3dfd6a8834b&page=${this.state.page+1}&pagesize=${this.props.pageSize}`
    //     this.setState({loading:true})
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     console.log(parsedData);
    //     this.setState({
    //         articles:parsedData.articles,
    //         page:this.state.page+1,
    //         loading:false
    //     })
    // }
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  handlePreviousClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5c84c1686b2148f3a614f3dfd6a8834b&pagesize=${this.props.pageSize}`
    // this.setState({ loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log("previous");
    // this.setState({
    //     articles:parsedData.articles,
    //     page:this.state.page-1,
    //     loading:false
    // })
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  async updateNews() {
    console.log("set progress", this.props.setProgress(10));
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&apiKey=${this.props.apiKey}&pagesize=${this.props.pageSize}`;
    // let url = `https://newsapi.org/v2/everything?q=${this.props.country}&from=2023-08-23&to=2023-08-23&sortBy=popularity&category=${this.props.category}&apiKey=5c84c1686b2148f3a614f3dfd6a8834b&pagesize=${this.props.pageSize}`
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    console.log(parsedData);
    this.props.setProgress(50);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.setProgress(100);
  }

  async componentDidMount() {
    // it executes after render method after rendered
    console.log("componentdidmount executed");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5c84c1686b2148f3a614f3dfd6a8834b&pagesize=${this.props.pageSize}`;
    // let url = `https://newsapi.org/v2/everything?q=${this.props.country}&from=2023-08-23&to=2023-08-23&sortBy=popularity&category=${this.props.category}&apiKey=5c84c1686b2148f3a614f3dfd6a8834b&pagesize=${this.props.pageSize}`
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&apiKey=5c84c1686b2148f3a614f3dfd6a8834b&pagesize=${this.props.pageSize}`;
    // let url = `https://newsapi.org/v2/everything?q=${this.props.country}&from=2023-08-23&to=2023-08-23&sortBy=popularity&category=${this.props.category}&apiKey=5c84c1686b2148f3a614f3dfd6a8834b&pagesize=${this.props.pageSize}`
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };
  render() {
    console.log("render executed");
    let headline = this.props.category;

    return (
      <>
        <h2 className="text-center" style={{ margin: "29px 0px" }}>
          {" "}
          NewsGossips- Top HeadLines on {this.capitalizeFirstLetter(headline)}
        </h2>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
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
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            class="btn btn-success"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            class="btn btn-success"
            onClick={this.handleNextClick}
          >
            {" "}
            &rarr; Next
          </button>
        </div> */}
      </>
    );
  }
}

// export default News
