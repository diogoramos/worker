/**
 * Configuration File
 */
const config = {
	consumer_key: process.env.TWITTER_CONSUMER_KEY || "MJ6JvQLWfb4wWCTrzRlSXSPiF",
  	consumer_secret: process.env.TWITTER_CONSUMER_SECRET || "4v37YGsnTTkA2GH2EZgYl5zgICwDk7kmPiH5TzYDM7JsqdkElP",
  	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY || "1035888776286023680-c1cJnKvnehgL4o2qoF8MnTNEEgmlIy",
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || "NBrO5svIpYdgwXk8TlC2U4AzwWd0TEBpWUj0Nj6PZCiMk",
	hashtags: process.env.HASHTAGS || "#devops"  
}

module.exports = config;