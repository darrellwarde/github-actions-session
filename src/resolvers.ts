import { reverseString } from "./utils";

const resolvers = {
  Thing: {
    reverseName: (object: any) => reverseString(object.name),
  },
};

export default resolvers;
