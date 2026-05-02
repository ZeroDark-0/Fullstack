const express = require('express');
const shortid = require('shortid');
const Url = require('../models/Url');

const router = express.Router();

//POST /shortUrl
router.post('/shortUrl', async (req, res) => {
    const { longUrl } = req.body;
    const shortId = shortid.generate();

    const url = new Url({ shortId, longUrl });
    await url.save();

    res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortId}` });
});

//GET /:shortId
router.get('/:shortId', async (req, res) => {
    const url = await Url.findOneAndUpdate(
        { shortId: req.params.shortId },
        { $inc: { accessCount: 1 } }
    );

    if (!url) return res.status(404).json({ error: 'URL not found' });
    res.redirect(url.longUrl);
});

//PATCH /:shortId
router.patch('/:shortId', async (req, res) => {
    const { longUrl, accessCount } = req.body;
    const update = {};

    if (longUrl) update.longUrl = longUrl;
    if (accessCount !== undefined) update.accessCount = accessCount;

    const url = await Url.findOneAndUpdate(
        { shortId: req.params.shortId },
        update,
        { new: true }
    );

    if (!url) return res.status(404).json({ error: 'URL not found' });
    res.json(url);
});

module.exports = router;