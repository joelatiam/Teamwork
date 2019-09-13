
let activeUserInfo = {};

const roleInMarketing = ['Chief Marketing Officer', 'Marketing Specialist', 'Brand Manager', 'Product Manager', 'SEO Specialist'];
const roleInFinance = ['Accountant', 'Auditor', 'Budget Analyst', 'Chief Finance Officer', 'Finance Administr ator'];
const roleInOperation = ['Operations Manager', 'Materials Manager', 'Quality Assurance Manager', 'Logistics Manager', 'Purchasing Manager'];
const roleInHR = ['HR officer', 'Office manager', 'Occupational psychologist', 'Training and development officer'];
const roleInIT = ['Cloud architect', 'Mobile app developer', 'Web developer', 'Software engineer', 'Data Modeler'];

const myCompany = [['Marketing', roleInMarketing], 
                ['Finance',roleInFinance],
                ['Operations Management', roleInOperation],
                ['human resource', roleInHR],
                ['IT', roleInIT]];

const myGender = ['male', 'female', 'other'];

let users = [
    {
        firstName: 'Joël',
        lastName: 'Atiamutu',
        gender: 'male',
        email: 'joelatiam@googlemail.com',
        password: '123456',
        department: 'IT',
        jobRole: 'Web developer',
        address: '12 av du Palmier',
        topics: [],
        joined: Date.now(),
    }
];

let topics = [
    '',
    'Arts & Entertainment',
    'Business',
    'Productivity',
    'Work',
    'Technology',
    'Software Engineering',
    'Family',
    'Health',
    'Relationships',
    'Travel',
    'Education',
    'Politics'
];