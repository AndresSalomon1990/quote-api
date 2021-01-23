const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);

    res.send({
        quote: randomQuote
    });
});

app.get('/api/quotes', (req, res, next) => {
    const personQuery = req.query.person;

    if(personQuery) {
        const quotesArrayFiltered = quotes.filter(quote => quote.person === personQuery);

        res.send({
            quotes: quotesArrayFiltered
        });
    } else {
        res.send({
            quotes: quotes
        });
    }
});

app.post('/api/quotes', (req, res, next) => {
    const newQuoteObject = {
        quote: req.query.quote,
        person: req.query.person
    }

    if(newQuoteObject.quote && newQuoteObject.person) {
        quotes.push(newQuoteObject);

        res.status(201).send({ quote: newQuoteObject });
    } else {
        res.status(400).send("You should enter both quote and person.");
    }
});

// http://localhost:4001
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}.`);
});