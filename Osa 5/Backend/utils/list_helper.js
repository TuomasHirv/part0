const dummy = (blogs) => {
    return 1
}
  
const totalLikes = (blogs) => {
    const len = Object.keys(blogs).length
    if (len === 0) {
        return 0
    }
    const likeArray = []
    for (var i = 0; i < len; i++) {
        likeArray.push(blogs[i].likes)
    }
    const amount = likeArray.reduce((preVal, curVal) => preVal + curVal);
    return amount
}
const favoriteblog = (blogs) => {
    const len = Object.keys(blogs).length
    if (len === 0) {
        return null
    }
    let mostLikes = 0
    let favourite = null
    for (var i = 0; i < len; i++) {
        if (blogs[i].likes > mostLikes) {
            favourite = i
            mostLikes = blogs[i].likes
        }
    }
    if (favourite === null) {
        return null
    }
    let _title = blogs[favourite].title
    let _author = blogs[favourite].author
    let _likes = blogs[favourite].likes
    return {
        title: _title,
        author: _author,
        likes: _likes
    }
}
module.exports = {
    dummy,
    totalLikes,
    favoriteblog
}