module.exports =  {
  getDatabaseUrl: function() {
      return (process.env.DATABASE_URL || 'mongodb://admin:admin@dharma.mongohq.com:10038/products')
  },
  itemsPerPage: 2
};
