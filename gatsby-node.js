/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 // You can delete this file if you're not using it



const path = require(`path`);
const createPaginatedPages = require("gatsby-paginate");


const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    // Query for nodes to use in creating pages.
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        return result;
      })
    );
  });

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  // const getArticle = makeRequest(
  //   graphql,
  //   `
  //   {
  //     allStrapiArticle {
  //       edges {
  //         node {
  //           id
  //         }
  //       }
  //     }
  //   }
  //   `
  // ).then(result => {
  //   // Create pages for each article.
  //   result.data.allStrapiArticle.edges.forEach(({ node }) => {
  //     createPage({
  //       path: `/${node.id}`,
  //       component: path.resolve(`src/templates/article.js`),
  //       context: {
  //         id: node.id,
  //       },
  //     });
  //   });
  // });


  const articles = new Promise((resolve,reject) => {
    graphql(`{
    allStrapiArticle(sort: { fields: [createdAt], order: DESC }) {
      edges {
        node {
          id,
          content,
          published_on,
          title,
          author {
            id,
            username
          },
          tags {
            id,
            name
          }
        }
      }
    }
  }`).then(result => {
      if (result.errors) {
        reject(result.errors);
      }
      createPaginatedPages({
        edges: result.data.allStrapiArticle.edges,
        createPage: createPage,
        pageTemplate: path.resolve("src/templates/articles.js"),
        pageLength: 5,
        pathPrefix: "article",
        context: {}
      });
      result.data.allStrapiArticle.edges.map(({ node }) => {
        createPage({
          path: `/${node.id}`,
          component: path.resolve(`src/templates/article.js`),
          context: {
            id: node.id,
          },
        });
      });
      resolve();
    });
  });

  const getAuthors = makeRequest(
    graphql,
    `
    {
      allStrapiUser {
        edges {
          node {
            id
          }
        }
      }
    }
    `
  ).then(result => {
    // Create pages for each user.
    result.data.allStrapiUser.edges.forEach(({ node }) => {
      createPage({
        path: `/authors/${node.id}`,
        component: path.resolve(`src/templates/user.js`),
        context: {
          id: node.id,
        },
      });
    })
  });


  // Query for articles nodes to use in creating pages.
    return Promise.all([articles, getAuthors]);
};

