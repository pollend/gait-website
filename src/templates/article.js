import React from 'react'
import Link from 'gatsby-link'
const ReactMarkdown = require('react-markdown')

const ArticleTemplate = ({ data }) => (
  <div>
    <h1>{data.strapiArticle.title}</h1>
    <p>by <Link to={`/authors/${data.strapiArticle.author.id}`}>{data.strapiArticle.author.username}</Link></p>
    <ReactMarkdown source={data.strapiArticle.content}/>
  </div>
)

export default ArticleTemplate

export const query = graphql`  
  query ArticleTemplate($id: String!) {
    strapiArticle(id: {eq: $id}) {
      title
      content
      author {
        id
        username
      }
    }
  }
`