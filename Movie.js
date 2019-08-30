class Movie {
    constructor(title, director, releaseDate, views, rating, description, genre, imgUrl, isFeatured) {
        this.title = title;
        this.director = director;
        this.releaseDate = releaseDate;
        this.views = views;
        this.rating = rating;
        this.description = description;
        this.genre = genre;
        this.imgUrl = imgUrl;
        this.isFeatured = isFeatured;
    }
}

module.exports = Movie;