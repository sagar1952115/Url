const { getOriginalUrl, createUrl, shortCodeExists } = require("../src/infra/url/urlMethods");
const { createShortUrl } = require("../src/utils/base62");

const dotenv = require("dotenv");
dotenv.config();

// Controller for shortening URL
exports.shortenUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;
    let shortCode;
    let exists = true;
    
    while (exists) {
      shortCode = await createShortUrl(longUrl);
      exists = await shortCodeExists(shortCode);
    }
    
    const newUrl = await createUrl(longUrl, shortCode);
    res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });
  } catch (error) {
    console.error('Error shortening URL:', error);
    res.status(500).json({ error: 'Error creating short URL' });
  }
};

// Controller for retrieving original URL
exports.getUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const originalUrl = await getOriginalUrl(shortCode);
    res.redirect(originalUrl);
  } catch (error) {
    console.error('Error retrieving URL:', error);
    res.status(404).json({ error: 'Short URL not found' });
  }
};