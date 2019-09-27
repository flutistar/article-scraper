# Medium Article Scraper

### Overview

This web app scrapes articles from the news site Medium, and lets users leave comments on the latest articles. This app uses Mongoose and Cheerio to scrape articles for display.

### Details

Every time a user scrapes from Medium, the articles are saved in MongoDB. The headline, summary, URL are saved in the database, as well as any comments written about an article.

Users are also able to delete comments, which will delete every user's comments.

This app is hosted on Heroku.

### How to run

Run `git clone https://github.com/akeimach/article-scraper.git` to clone the files to your local machine, then `npm init` to run the install.


### Packages used
 * express
 * express-handlebars
 * mongoose
 * body-parser
 * cheerio
 * request