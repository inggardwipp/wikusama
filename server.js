const express = require(`express`);

const app = express();
const cors = require(`cors`);
app.use(cors());
const PORT = 8000;

const mejaRoute = require(`./routes/meja.route`);

const menuRoute = require(`./routes/menu.route`);
const userRoute = require(`./routes/user.route`);
const transaksiRoute = require(`./routes/transaksi.route`);
const authRoute = require(`./routes/auth.route`);
app.use(mejaRoute);

//register route of menu
app.use(menuRoute);

//register route of user
app.use(userRoute);

//register route of transaksi
app.use(transaksiRoute);

//register route of transaksi
app.use(authRoute);

app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);
});