const express = require('express')
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes')
const loginRoutes = require('./routes/loginRoutes')
require('dotenv').config();
require('./utils/db')
const app = express();
app.use(express.json())
app.use('/api', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/auth', loginRoutes);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port`, process.env.PORT);
  });

