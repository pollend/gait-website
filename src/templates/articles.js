import React, { Component } from "react";
import Link from "gatsby-link";

const NavLink = props => {
  if (!props.test) {
    return <Link to={props.url}>{props.text}</Link>;
  } else {
    return <span>{props.text}</span>;
  }
};

const ArticlePage = ({ data, pathContext }) => {
  const { group, index, first, last, pageCount } = pathContext;
  const previousUrl = index - 1 == 1 ? "" : (index - 1).toString();
  const nextUrl = (index + 1).toString();

  return (
    <div>
      <h4>{pageCount} Posts</h4>

      {group.map(({ node }) => (
        <div key={node.id} className="blogListing">
          <div className="date">{node.published_on}</div>
          <Link className="blogUrl" to={node.title}>
            {node.title}
          </Link>
          <div>{node.content}</div>
        </div>
      ))}
      <div className="previousLink">
        <NavLink test={first} url={'/article/' +  previousUrl} text="Go to Previous Page" />
      </div>
      <div className="nextLink">
        <NavLink test={last} url={'/article/' + nextUrl} text="Go to Next Page" />
      </div>
    </div>
  );
};
export default ArticlePage;

