function botUrl(id) {
    const url = `https://discordapp.com/oauth2/authorize?client_id={}&scope=bot`;
    return url.replace('{}', id);
}

module.exports = {
    botUrl
}
