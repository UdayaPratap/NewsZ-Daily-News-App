import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

  }
  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.substring(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      pageSize: 8,
      totalResults: 0
    }
    document.title = `NewsZ - ${this.capitalize(this.props.category)}`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}
    &page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(40);
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(75);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
    this.props.setProgress(100)
  }

  async componentDidMount() {
    this.updateNews();
  }

  handelNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();

  }
  handelPrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}
    &page=${this.state.page}&pageSize=${this.props.pageSize}`;

    
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    })
  };

  render() {
    return (
      <div className="container my-3">

        <h1 className="text-center" style={{ margin: "40px 0px" }}>NewsZ-Today's {this.capitalize(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader=<Spinner/>
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return <div key={element.url} className="col md-4">
                  <NewsItem title={element.title ? element.title + "..." : ""} description={element.description ? element.description.substring(0, 100) + "..." : ""} newsUrl={element.url} imageUrl={element.urlToImage} author={element.author != null ? element.author : 'Unknown'} date={new Date(element.publishedAt).toGMTString()} source={element.source.name}
                  />
                </div>

              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" class="btn btn-dark" onClick={this.handelPrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" class="btn btn-dark" onClick={this.handelNextClick}> Next &rarr;</button>
        </div> */}
      </div>

    )
  }
}

export default News