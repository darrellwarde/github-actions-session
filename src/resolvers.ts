import { reverseString } from "./utils";

const resolvers = {
  Thing: {
    reverseName: (obj: any) => reverseString(obj.name),
  },
};

export default resolvers;
