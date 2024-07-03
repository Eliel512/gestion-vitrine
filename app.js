const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const entrepreneurRoutes = require('./routes/entrepreneurRoutes');
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');
const swaggerDocs = require('./config/swagger');

const app = express();

connectDB();

app.use(morgan('dev'));
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/entrepreneurs', entrepreneurRoutes);

swaggerDocs(app);

app.use(errorHandler);

module.exports = app;