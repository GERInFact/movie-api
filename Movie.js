class Movie {
    constructor(title, description, genre, director, actors, imgUrl, featured) {
        this.title = title;
        this.description = description;
        this.genre = genre;
        this.director = director;
        this.actors = actors;
        this.imgUrl = imgUrl;
        this.featured = featured;
    }
}

module.exports = Movie;