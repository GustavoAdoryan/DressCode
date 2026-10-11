const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { sequelize } = require('./src/model'); // Certifique-se de que o caminho está correto
const authRoutes = require('./src/routes/AuthRoutes');
const usuarioRoutes = require('./src/routes/UsuarioRoutes');
const portifolioRoutes = require('./src/routes/PortifolioRoutes');
const perfilRoutes = require('./src/routes/PerfilRoutes');
const agendamentoRoutes = require('./src/routes/AgendamentoRoutes');
const cors = require('cors'); // Importar o cors


dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:5173', // Permitir o domínio do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use('/api', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', portifolioRoutes);
app.use('/api', perfilRoutes);
app.use('/api', agendamentoRoutes);

sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        return sequelize.sync();
    })
    .catch(err => console.log('Error: ' + err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
