const Url = require('../../schema/url.js');

// Create a new short URL
async function createUrl(originalUrl, shortCode) {
  try {
    const newUrl = new Url({
      originalUrl,
      shortCode,
    });
    await newUrl.save();
    return newUrl;
  } catch (error) {
    console.error('Error creating URL:', error);
    throw error;
  }
}

// Get the original URL from a short code
async function getOriginalUrl(shortCode) {
  try {
    const url = await Url.findOne({ shortCode });
    if (!url) {
      throw new Error('URL not found');
    }
    return url.originalUrl;
  } catch (error) {
    console.error('Error getting original URL:', error);
    throw error;
  }
}

// Check if a short code already exists
async function shortCodeExists(shortCode) {
  try {
    const url = await Url.findOne({ shortCode });
    return !!url;
  } catch (error) {
    console.error('Error checking short code:', error);
    throw error;
  }
}

// Get all URLs for a user
async function getUserUrls(userId) {
  try {
    const urls = await Url.find({ userId });
    return urls;
  } catch (error) {
    console.error('Error getting user URLs:', error);
    throw error;
  }
}

// Delete a URL
async function deleteUrl(shortCode, userId) {
  try {
    const result = await Url.deleteOne({ shortCode, userId });
    if (result.deletedCount === 0) {
      throw new Error('URL not found or user not authorized');
    }
    return true;
  } catch (error) {
    console.error('Error deleting URL:', error);
    throw error;
  }
}

module.exports = {
  createUrl,
  getOriginalUrl,
  shortCodeExists,
  getUserUrls,
  deleteUrl,
};