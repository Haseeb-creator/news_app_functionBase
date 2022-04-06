import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, publishedAt, source } = this.props

    return (
      <div className='my-3'>
        <div className='card'>
          <div>
            <span className='badge rounded-pill bg-danger' style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0 }}>
              {source}
            </span>
          </div>

          <img src={!imageUrl ? 'https://ichef.bbci.co.uk/news/1024/branded_news/2F98/production/_123548121_gettyimages-131212973-1.jpg' : imageUrl} className='card-img-top' alt='img' />
          <div className='card-body'>
            <h5 className='card-title'>{title}...</h5>
            <p className='card-text'>{description}...</p>
            <p className='card-text'>
              <small className='text-warning'>
                By {author} at {publishedAt}
              </small>
            </p>
            <a href={newsUrl} target='_blank' rel='noreferrer' className='btn btn-sm btn-primary'>
              Read more
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
