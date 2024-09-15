const cohere = require('cohere-ai'); // Import Cohere SDK

// Set your API key here
cohere.init('zeBRGTNenNJuhDSVYDMAi63zVSEVEQJC9NhS9Ctz');

// Function to get embeddings from Cohere
async function getEmbedding(text) {
    const response = await cohere.embed({
        model: 'embed-english-v2.0',
        texts: [text],
    });
    return response.body.embeddings[0];
}

// Function to calculate cosine similarity between two vectors
function cosineSimilarity(vec1, vec2) {
    const dotProduct = vec1.reduce((acc, val, i) => acc + val * vec2[i], 0);
    const norm1 = Math.sqrt(vec1.reduce((acc, val) => acc + val * val, 0));
    const norm2 = Math.sqrt(vec2.reduce((acc, val) => acc + val * val, 0));
    return dotProduct / (norm1 * norm2);
}

// Function to find the most compatible profile
async function mostCompatible(profiles, userProfile) {
    const userEmbedding = await getEmbedding(userProfile);

    let maxSimilarity = -1.0;
    let mostCompatibleProfile = null;

    for (const profile of profiles) {
        const profileEmbedding = await getEmbedding(profile);
        const similarity = cosineSimilarity(userEmbedding, profileEmbedding);

        if (similarity > maxSimilarity) {
            maxSimilarity = similarity;
            mostCompatibleProfile = profile;
        }
    }

    return mostCompatibleProfile;
}

module.exports = {
    getEmbedding,
    cosineSimilarity,
    mostCompatible
};
