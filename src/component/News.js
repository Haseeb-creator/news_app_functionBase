import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
  static defaultProps = {
    pageSize: 6,
    country: 'in',
  }

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
  }

  capitalizeFirstLetter = ([first, ...rest], locale = navigator.language) => first.toLocaleUpperCase(locale) + rest.join('')

  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`
  }

  async updateNews() {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`

    this.setState({ loading: true })
    let data = await fetch(url)
    this.props.setProgress(30)
    let parsedData = await data.json()
    this.props.setProgress(70)
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
    this.props.setProgress(100)
  }

  async componentDidMount() {
    /* let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cae1ef851896490e910a5b606c981af1&page=${this.page}&pageSize=${this.props.pageSize}`
		let data = await fetch(url)
		let parsedData = await data.json()
		console.log(parsedData)
		this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults }) */
    this.updateNews()
  }

  /* handlePrevClick = async () => {
						let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cae1ef851896490e910a5b606c981af1&page=${this.state.page - 1}&pageSize=${
						this.props.pageSize
				}`
				let data = await fetch(url)
				let parsedData = await data.json()
				this.setState({ articles: parsedData.articles })
				this.setState({
						page: this.state.page - 1,
				}) 
				this.setState({ page: this.state.page - 1 })
				this.updateNews()
		}*/

  /*handleNextClick = async () => {
		if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
				let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cae1ef851896490e910a5b606c981af1&page=${this.state.page + 1}&pageSize=${
						this.props.pageSize
				}`
				let data = await fetch(url)
				let parsedData = await data.json()
				this.setState({ articles: parsedData.articles })
				this.setState({
						page: this.state.page + 1,
				})
		} 
		this.setState({ page: this.state.page + 1 })
		this.updateNews()
}*/

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`

    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    })
  }

  render() {
    return (
      <>
        <h2 className='text-center' style={{ margin: '35px 0px' }}>
          NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h2>
        {this.state.loading && <Spinner />}

        <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length !== this.state.totalResults} loader={<Spinner />}>
          <div className='container'>
            <div className='row'>
              {this.state.articles.map((element) => {
                return (
                  <div className='col-md-4' key={element.index}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      publishedAt={new Date(element.publishedAt).toGMTString()}
                      source={element.source.name}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between justify-content-end'>
          <button type='button' disabled={this.state.page <= 1} className='btn btn-dark' onClick={this.handlePrevClick}>
            &larr; Previous
          </button>
          <button type='button' disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className='btn btn-dark ' onClick={this.handleNextClick}>
            Next &rarr;
          </button>
        </div> */}
      </>
    )
  }
}

export default News
