const Book = require("../models/book");

module.exports = {
    getProfile: (req, res) => {
          res.render("booksearch.ejs", {searchResults: {items: []} });
      },
    getBookSearch: (req, res) => {
        const search = req.query.search
        console.log(req.query)
        const url = `https://www.googleapis.com/books/v1/volumes?q=${search}`;
        console.log(url)
        fetch(url)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
                console.log((data))

                res.render("booksearch.ejs", { searchResults: data })
            })
            .catch(err => {
                console.log(`error ${err}`);
            });


    },
    createBookmark: async (req, res) => {
      console.log(req.body)
      await Book.create({
        title: req.body.title,
        cover: req.body.cover,
        author: req.body.author,
        user: req.user.id,
        status: 'unread',
      })
      res.redirect("/bookmarks")
    },
    getBookmarks: async (req, res) => {
        try {
          const filter = { user: req.user.id }
          if(req.query.status){
            filter.status = req.query.status
          }
          console.log(filter)
          const books = await Book.find(filter);
          console.log(books)
          res.render("bookmarks.ejs", { books: books, user: req.user });
        } catch (err) {
          console.log(err);
        }
    },
    updateStatus: async (req, res) => {
      const bookId = req.params.id;
      const newStatus = req.body.statusValue;
    
      try {
        await Book.findByIdAndUpdate(bookId, { $set: { status: newStatus } });
        console.log(`${newStatus} status updated for book ${bookId}`);
        res.redirect("/bookmarks");
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
    },


    }
