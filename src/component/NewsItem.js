import React from 'react'

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, publishedAt, source } = props

  return (
    <div className=' my-3 '>
      <div className='card p-0 overflow-hidden  shadow '>
        <div>
          <span className='badge rounded-pill bg-danger badge-style'>{source}</span>
        </div>

        <img src={!imageUrl ? 'https://ichef.bbci.co.uk/news/1024/branded_news/2F98/production/_123548121_gettyimages-131212973-1.jpg' : imageUrl} className='card-img-top img-fluid' alt='img' />
        <div className='card-body'>
          <h5 className='card-title'>{title ? title.slice(0, 60) : ' '}...</h5>
          <p className='card-text'>{description ? description.slice(0, 70) : ' '}...</p>
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

export default NewsItem
