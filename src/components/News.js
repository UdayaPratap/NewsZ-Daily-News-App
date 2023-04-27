import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News=(props)=> {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalResults, setTotalResults] = useState(0);
  // document.title = `NewsZ - ${capitalize(props.category)}`;
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.substring(1);
  }

  const updateNews= async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}
    &page=${page}&pageSize=${props.pageSize}`;
    props.setProgress(40);
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(75);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100)
  }
  useEffect(() => {
    updateNews()
  })
  
  // const handelNextClick = async () => {
  //   setPage(page+1);
  //   updateNews();
  // }
  // const handelPrevClick = async () => {
  //   setPage(page-1);
  //   updateNews();
  // }

  const fetchMoreData = async () => {
    setPage(page+1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}
    &page=${page}&pageSize=${pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults( parsedData.totalResults);
  };

    return (
      <div className="container my-3">

        <h1 className="text-center" style={{ margin: "40px 0px" }}>NewsZ-Today's {capitalize(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader=<Spinner/>
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return <div key={element.url} className="col md-4">
                  <NewsItem title={element.title ? element.title + "..." : ""} description={element.description ? element.description.substring(0, 100) + "..." : ""} newsUrl={element.url} imageUrl={element.urlToImage} author={element.author != null ? element.author : 'Unknown'} date={new Date(element.publishedAt).toGMTString()} source={element.source.name}
                  />
                </div>

              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={page <= 1} type="button" class="btn btn-dark" onClick={handelPrevClick}>&larr; Previous</button>
          <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" class="btn btn-dark" onClick={handelNextClick}> Next &rarr;</button>
        </div> */}
      </div>

    )
  
}
News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string

}
export default News