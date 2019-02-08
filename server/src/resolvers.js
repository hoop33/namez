module.exports = {
  Query: {
    names: async (_, { after, pageSize = 10 }, { dataSources }) => {
      const names = await dataSources.nameAPI.getNames(
        after,
        pageSize,
        dataSources.wordnikAPI
      );
      return {
        cursor: names.length ? names[names.length - 1].id : null,
        nodes: names
      };
    },
    name: (_, { id }, { dataSources }) => dataSources.nameAPI.getNameById(id)
  }
};
