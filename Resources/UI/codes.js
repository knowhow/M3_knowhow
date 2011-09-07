var boCodes = {};

// articles namespace
boCodes.Articles = {};
// customers namespace
boCodes.Customers = {};
	
// get articles from db
boCodes.Articles.getArticles = function() {
	return boMobileAppLib.db.getArticlesData()
};		
	
// get article matrix based on article JSON data
boCodes.Articles.getArticleMatrix = function( article_data ) {
	return boCodes.Matrix.getMatrix( article_data, "artikli" );
};
// get customers
boCodes.Customers.getCustomers = function() {
		
};
	
// get customer form...
boCodes.Customers.getCustomerForm = function() {
	return boCodes.Customers.customerForm();
};

