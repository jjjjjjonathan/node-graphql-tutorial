const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'fullstack tutorial for graphQL'
  },
  {
    id: 'link-1',
    url: 'www.jcheng.ca',
    description: 'my portfolio'
  }
];

// 2
const resolvers = {
  Query: {
    info: () => `This is the API of a hackernews clone`,
    feed: () => links
  },
  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;

      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    }
  }
};

// 3
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8'),
  resolvers
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
