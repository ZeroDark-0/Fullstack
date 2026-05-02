Build a url shorting using express and mongodb

- **Post/shortUrl** Accepts a long url and returns a short url
- **Get/:shortId** Redirects to the original url and increments the access count 
- **Patch/:shortId** Allow updating the long url or access count