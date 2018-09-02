/**
 * Configuration File
 */
const config = {
	consumer_key: process.env.TWITTER_CONSUMER_KEY || "",
  	consumer_secret: process.env.TWITTER_CONSUMER_SECRET || "",
  	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY || "",
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || "",
	hashtags: process.env.HASHTAGS || "openbanking, apifirst, devops, cloudfirst, microservices, apigateway, oauth, swagger, raml, openapis"  
}

module.exports = config;