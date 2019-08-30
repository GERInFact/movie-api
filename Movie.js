class Movie {
    constructor(title, director, releaseDate, views, rating, description, imgUrl) {
        this.title = title;
        this.director = director;
        this.releaseDate = releaseDate;
        this.views = views;
        this.rating = rating;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

module.exports = Movie;