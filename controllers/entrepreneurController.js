const nodemailer = require('nodemailer');
const Entrepreneur = require('../models/Entrepreneur');

// Configurez le transporteur de mails
const transporter = nodemailer.createTransport({
    service: 'gmail', // Utilisez le service de votre choix
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Créez le template de mail
const getMailOptions = (entrepreneur) => ({
    from: process.env.EMAIL_USER,
    to: entrepreneur.email,
    subject: 'Confirmation d\'inscription',
    html: `
    <html>
    <head>
        <style>
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                font-family: Arial, sans-serif;
                color: #333;
            }
            .header {
                background-color: #f4f4f4;
                padding: 10px;
                text-align: center;
                font-size: 24px;
                font-weight: bold;
            }
            .content {
                margin-top: 20px;
            }
            .footer {
                margin-top: 20px;
                text-align: center;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">Confirmation d'Inscription</div>
            <div class="content">
                <p>Bonjour ${entrepreneur.fullName},</p>
                <p>Merci de vous être inscrit à notre file d'attente des entrepreneurs.</p>
                <p>Nous avons bien reçu votre inscription et nous vous contacterons bientôt.</p>
            </div>
            <div class="footer">
                &copy; ${new Date().getFullYear()} Votre Site Vitrine. Tous droits réservés.
            </div>
        </div>
    </body>
    </html>
    `
});

exports.registerEntrepreneur = async (req, res) => {
    try {
        const { fullName, birthDate, nationality, gender, email, phoneNumber, status, sector, experience } = req.body;

        const newEntrepreneur = new Entrepreneur({
            fullName,
            birthDate,
            nationality,
            gender,
            email,
            phoneNumber,
            status,
            sector,
            experience
        });

        await newEntrepreneur.save();

        // Envoyer le mail de confirmation
        const mailOptions = getMailOptions(newEntrepreneur);
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erreur lors de l\'envoi de l\'email:', error);
            } else {
                console.log('Email envoyé:', info.response);
            }
        });

        res.status(201).json({ message: 'Inscription réussie', entrepreneur: newEntrepreneur });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'inscription', error: error.message });
    }
};

exports.getEntrepreneurs = async (req, res) => {
    try {
        const entrepreneurs = await Entrepreneur.find();
        res.status(200).json(entrepreneurs);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des entrepreneurs', error: error.message });
    }
};