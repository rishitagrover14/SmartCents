const mongoose = require('mongoose');
const Question = require('./models/question');

const questions = [
    {
        questionText: 'Which of the following are public sector banks in India?',
        options: [
            { text: 'State Bank of India', isCorrect: true },
            { text: 'Punjab National Bank', isCorrect: true },
            { text: 'ICICI Bank', isCorrect: false },
            { text: 'Bank of Baroda', isCorrect: true },
            { text: 'HDFC Bank', isCorrect: false },
            { text: 'Canara Bank', isCorrect: true },
            { text: 'Axis Bank', isCorrect: false },
            { text: 'Central Bank of India', isCorrect: true },
            { text: 'IndusInd Bank', isCorrect: false }
        ]
    },
    {
        questionText: 'Which documents are accepted for KYC (Know Your Customer) in Indian banks?',
        options: [
            { text: 'Aadhaar Card', isCorrect: true },
            { text: 'Voter ID', isCorrect: true },
            { text: 'Office ID', isCorrect: false },
            { text: 'PAN Card', isCorrect: true },
            { text: 'School ID', isCorrect: false },
            { text: 'Driving License', isCorrect: true },
            { text: 'Library Card', isCorrect: false },
            { text: 'Passport', isCorrect: true },
            { text: 'Gym Membership Card', isCorrect: false }
        ]
    },
    {
        questionText: 'Which of the following are types of savings accounts offered by Indian banks?',
        options: [
            { text: 'Basic Savings Bank Deposit Account', isCorrect: true },
            { text: 'Recurring Deposit Account', isCorrect: false },
            { text: 'Zero Balance Account', isCorrect: true },
            { text: 'Salary Account', isCorrect: true },
            { text: 'Fixed Deposit Account', isCorrect: false },
            { text: 'Premium Savings Account', isCorrect: true },
            { text: 'Joint Account', isCorrect: true },
            { text: 'Overdraft Account', isCorrect: false },
            { text: 'NRI Account', isCorrect: true }
        ]
    },
    {
        questionText: 'What are the different electronic funds transfer systems available in India?',
        options: [
            { text: 'NEFT', isCorrect: true },
            { text: 'IMPS', isCorrect: true },
            { text: 'SWIFT', isCorrect: false },
            { text: 'RTGS', isCorrect: true },
            { text: 'Western Union', isCorrect: false },
            { text: 'UPI', isCorrect: true },
            { text: 'Visa Money Transfer', isCorrect: false },
            { text: 'PayPal', isCorrect: false },
            { text: 'RuPay', isCorrect: true }
        ]
    },
    {
        questionText: 'Which Indian banks offer digital-only banking services?',
        options: [
            { text: 'Digibank by DBS', isCorrect: true },
            { text: 'Paytm Payments Bank', isCorrect: true },
            { text: 'Airtel Payments Bank', isCorrect: true },
            { text: 'Kotak 811', isCorrect: true },
            { text: 'YONO by SBI', isCorrect: true },
            { text: 'Jio Payments Bank', isCorrect: true },
            { text: 'IDFC First Bank', isCorrect: false },
            { text: 'Fino Payments Bank', isCorrect: true },
            { text: 'ICICI Digital Bank', isCorrect: false }
        ]
    },
    {
        questionText: 'Which of the following types of insurance are commonly available in India?',
        options: [
            { text: 'Life Insurance', isCorrect: true },
            { text: 'Health Insurance', isCorrect: true },
            { text: 'Travel Insurance', isCorrect: true },
            { text: 'Crop Insurance', isCorrect: true },
            { text: 'Home Insurance', isCorrect: true },
            { text: 'Marine Insurance', isCorrect: false },
            { text: 'Car Insurance', isCorrect: true },
            { text: 'Fire Insurance', isCorrect: true },
            { text: 'Aviation Insurance', isCorrect: false }
        ]
    },
    {
        questionText: 'Which factors are considered by credit rating agencies in India when determining a credit score?',
        options: [
            { text: 'Payment History', isCorrect: true },
            { text: 'Credit Utilization Ratio', isCorrect: true },
            { text: 'Length of Credit History', isCorrect: true },
            { text: 'Types of Credit Accounts', isCorrect: true },
            { text: 'Recent Credit Inquiries', isCorrect: true },
            { text: 'Employment History', isCorrect: false },
            { text: 'Age of the Applicant', isCorrect: false },
            { text: 'Geographic Location', isCorrect: false },
            { text: 'Family Background', isCorrect: false }
        ]
    },
    {
        questionText: 'What are the documents required to take a loan in India?',
        options: [
            { text: 'Aadhaar Card', isCorrect: true },
            { text: 'PAN Card', isCorrect: true },
            { text: 'Salary Slips', isCorrect: true },
            { text: 'Bank Statements', isCorrect: true },
            { text: 'Employment Certificate', isCorrect: true },
            { text: 'Utility Bills', isCorrect: true },
            { text: 'Passport Size Photographs', isCorrect: true },
            { text: 'Driving License', isCorrect: false },
            { text: 'Office ID', isCorrect: false }
        ]
    },
    {
        questionText: 'What types of loans are provided by banks in India?',
        options: [
            { text: 'Home Loan', isCorrect: true },
            { text: 'Travel Loan', isCorrect: false },
            { text: 'Education Loan', isCorrect: true },
            { text: 'Car Loan', isCorrect: true },
            { text: 'Gold Loan', isCorrect: true },
            { text: 'Shopping Loan', isCorrect: false },
            { text: 'Business Loan', isCorrect: true },
            { text: 'Payday Loan', isCorrect: false },
            { text: 'Agriculture Loan', isCorrect: true }
        ]
    }
];

const seedQuestions = async () => {
    await mongoose.connect('mongodb+srv://screeningUser:zEH8TQpXB72AtQ1L@samunnati-screening-clu.lsyxsc2.mongodb.net/', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    await Question.deleteMany();
    await Question.insertMany(questions);

    console.log('Questions seeded!');
    mongoose.connection.close();
};

seedQuestions();
