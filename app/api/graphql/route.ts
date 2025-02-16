import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client/extension";
import { prisma } from "../../../prisma/db";
import { typeDefs } from "@/graphql/typedefs";
import { resolvers } from "@/graphql/Resolvers";
export type Context = {
  prisma: PrismaClient;
};

const apolloServer = new ApolloServer<Context>({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res, prisma }),
});

export { handler as GET, handler as POST };
