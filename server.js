import express from 'express';

const app = express();

const port = 3000;

app.use(express.urlencoded());

app.get('/catalog', (req, res) => {
  const {itemid} = req.query;
  if (isNaN(Number(itemid))) {
    res.status(400).send('ERROR: itemid must be a number');
    return;
  }
  res.send(`Oh, you're looking for item ${itemid}?`);
});

app.get('/browse/:category', (req, res) => {
  const {category} = req.params;
  const {keywords} = req.query;
  console.log(req.query);
  res.send(`Searching for ${keywords} in the ${category} category`);
});

app.get('/play/:artist/song/:song', (req, res) => {
  const {artist, song} = req.params;
  res.send(`You want to listen to ${song} by ${artist}?`);  
});

app.get('/getform', (req, res) => {
  res.send(
    `
    <html>
      <body>
        <form action='/submitform' method='post'>
        <label for="addr">Address:</label><br>
        <input type="text" id="addr" name="addr" placeholder="123 Main St"><br><br>
        <label for="city">City:</label><br>
        <input type="text" id="city" name="city" placeholder="Smallville"><br><br>
        <label for="zip">Zipcode:</label><br>
        <input type="text" id="zip" name="zip" placeholder="01234"><br><br>
        <input type="submit" value="Submit">
        </form>
      </body>
    </html>
    `
  )
});

app.post('/submitform', (req, res) => {
  const {addr, city, zip} = req.body;
  res.send(`Great, your item will be shipped to ${addr}, ${city}, ${zip}`);
});



app.listen(port);
