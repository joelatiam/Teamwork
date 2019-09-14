
let activeUserInfo = {};

const roleInMarketing = ['Chief Marketing Officer', 'Marketing Specialist', 'Brand Manager', 'Product Manager', 'SEO Specialist'];
const roleInFinance = ['Accountant', 'Auditor', 'Budget Analyst', 'Chief Finance Officer', 'Finance Administrator'];
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
        joined: new Date(),
    },
    {
        firstName: 'Nissi',
        lastName: 'Atiamutu',
        gender: 'male',
        email: 'nissiatiam@googlemail.com',
        password: '123456',
        department: 'Marketing',
        jobRole: 'Marketing Specialist',
        address: '12 av du Palmier',
        topics: [],
        joined: new Date(),
    },
    {
        firstName: 'Ken',
        lastName: 'Bwende',
        gender: 'male',
        email: 'kenB@googlemail.com',
        password: '123456',
        department: 'Operations Management',
        jobRole: 'Operations Manager',
        address: '12 av du Palmier',
        topics: [],
        joined: new Date(),
    },
    {
        firstName: 'Olivier',
        lastName: 'Esuka',
        gender: 'male',
        email: 'oesukam@andela.com',
        password: '123456',
        department: 'IT',
        jobRole: 'Cloud architect',
        address: '12 Kigali Rwanda',
        topics: [],
        joined: new Date(),
    },
    {
        firstName: 'Natacha',
        lastName: 'Boyoko',
        gender: 'female',
        email: 'natachaboy@gmail.com',
        password: '123456',
        department: 'human resource',
        jobRole: 'Occupational psychologist',
        address: '15 Himbi Goma',
        topics: [],
        joined: new Date(),
    },
    {
        firstName: 'Christian',
        lastName: 'Atiamutu',
        gender: 'male',
        email: 'chrisatiam@gmail.com',
        password: '123456',
        department: 'Finance',
        jobRole: 'Budget Analyst',
        address: '15 City center Goma',
        topics: [],
        joined: new Date(),
    },
    {
        firstName: 'Blaise',
        lastName: 'Bikoro',
        gender: 'male',
        email: 'blaiseBik@gmail.com',
        password: '123456',
        department: 'Finance',
        jobRole: 'Auditor',
        address: '15 Himbi Goma',
        topics: [],
        joined: new Date(),
    },
    {
        firstName: 'Marc',
        lastName: 'Lomba',
        gender: 'male',
        email: 'marcLo@gmail.com',
        password: '123456',
        department: 'IT',
        jobRole: 'Web developer',
        address: '18 Kansanga Kampala',
        topics: [],
        joined: new Date(),
    },
    {
        firstName: 'Espoir',
        lastName: 'Murhabazi',
        gender: 'male',
        email: 'espMurh@andela.com',
        password: '123456',
        department: 'IT',
        jobRole: 'Data Modeler',
        address: '25 Downtown Kigali',
        topics: [],
        joined: new Date(),
    },
];

let articles = [
    {   
        id: 1,
        date: new Date(),
        title: 'The Marvel Superhero Who Saved Me',
        article: entertainment1,
        author: 'oesukam@andela.com',
        topic: 1,
    },
    {
        id: 2,
        date: new Date(),
        title: 'Movie Review: Hustlers',
        article: entertainment2,
        author: 'nissiatiam@googlemail.com',
        topic: 1,
    },
    {
        id: 3,
        date: new Date(),
        title: 'Apple Services Bundle Economics 101',
        article: business,
        author: 'nissiatiam@googlemail.com',
        topic: 2,
    },
    {
        id: 4,
        date: new Date(),
        title: 'Top 12 Things That Destroy Developer Productivity',
        article: productivity,
        author: 'natachaboy@gmail.com',
        topic: 3,
    },
    {
        id: 5,
        date: new Date(),
        title: 'What are people working on in coffee shops?',
        article: work,
        author: 'natachaboy@gmail.com',
        topic: 4,
    },
    {
        id: 6,
        date: new Date(),
        title: 'Blockchain is not only crappy technology but a bad vision for the future',
        article: technology,
        author: 'joelatiam@googlemail.com',
        topic: 5,
    },
    {
        id: 7,
        date: new Date(),
        title: 'Getting Into Software Development',
        article: software,
        author: 'kenB@googlemail.com',
        topic: 6,
    },
    {
        id: 8,
        date: new Date(),
        title: 'I Was Wrong About My Daughter’s Wedding',
        article: family,
        author: 'kenB@googlemail.com',
        topic: 7,
    },
    {
        id: 9,
        date: new Date(),
        title: 'The Healthiest People in the World Don’t Go to the Gym',
        article: health,
        author: 'chrisatiam@gmail.com',
        topic: 8,
    },
    {
        id: 10,
        date: new Date(),
        title: 'Our Relationships Are Mirrors for Ourselves',
        article: relationships,
        author: 'blaiseBik@gmail.com',
        topic: 9,
    },
    {
        id: 11,
        date: new Date(),
        title: 'How to travel the world and get companies to pay for it',
        article: travel,
        author: 'marcLo@gmail.com',
        topic: 10,
    },
    {
        id: 12,
        date: new Date(),
        title: 'I no longer understand my PhD dissertation ',
        article: education,
        author: 'marcLo@gmail.com',
        topic: 11,
    },
    {
        id: 13,
        date: new Date(),
        title: 'Why I Stopped Arguing Politics on Social Media',
        article: politics,
        author: 'espMurh@andela.com',
        topic: 12,
    },
]

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

