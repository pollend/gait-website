import React from 'react'
import Link from 'gatsby-link'
const ReactMarkdown = require('react-markdown')

const BlogPage = ({ data }) => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <ul>
      {data.allStrapiArticle.edges.map(document => (
        <li key={document.node.id}>
          <h2>
            <Link to={`/${document.node.id}`}>{document.node.title}</Link>
          </h2>
          <ReactMarkdown source={document.node.content} />
        </li>
      ))}
    </ul>
  </div>
)
export default BlogPage

export const blogQuery = graphql`  
  query BlogQuery {
    allStrapiArticle {
      edges {
        node {
          id
          title
          content
        }
      }
    }
  }
`