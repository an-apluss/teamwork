import db from '../db';

const createUser = async (
  email,
  firstname,
  lastname,
  password,
  gender,
  isAdmin,
  jobRole,
  department,
  address
) => {
  const query = `insert into users(email, firstname, lastname, password, gender, isadmin, jobrole, department, address) 
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`;
  const values = [
    email,
    firstname,
    lastname,
    password,
    gender,
    isAdmin,
    jobRole,
    department,
    address
  ];
  await db
    .query(query, values)
    .then(() => {
      console.log('user created successfully');
    })
    .catch(err => {
      console.log('users seeding failed.', err);
    });
};

const createArticle = async (userId, article, title) => {
  const query = `insert into articles(userId, article, title) values ($1, $2, $3)`;
  const values = [userId, article, title];
  await db
    .query(query, values)
    .then(() => {
      console.log('article created successfully');
    })
    .catch(err => {
      console.log('article seeding failed.', err);
    });
};

const createGif = async (userId, imageUrl, title) => {
  const query = `insert into gifs(userid, imageurl, title) values ($1, $2, $3)`;
  const values = [userId, imageUrl, title];
  await db
    .query(query, values)
    .then(() => {
      console.log('gif created successfully');
    })
    .catch(err => {
      console.log('gif seeding failed.', err);
    });
};

const createComment = async (userId, articleId, gifId, comment) => {
  const query = `insert into comments(userid, articleid, gifid, comment) values ($1, $2, $3, $4)`;
  const values = [userId, articleId, gifId, comment];
  await db
    .query(query, values)
    .then(() => {
      console.log('comment created successfully');
    })
    .catch(err => {
      console.log('comment seeding failed.', err);
    });
};

(async () => {
  await createUser(
    'anuoluwapoakinseye@gmail.com',
    'anuoluwapo',
    'akinseye',
    '$2b$10$iNkZIHC8.O2.IMttA3scg.ijA2ujMR3NJyM4.Oouo.AE06X0eK3LK',
    'male',
    true,
    'software developer',
    'IT',
    '20, surulere, Lagos'
  );

  await createUser(
    'marvy@gmail.com',
    'marvel',
    'akinseye',
    '$2b$10$iNkZIHC8.O2.IMttA3scg.ijA2ujMR3NJyM4.Oouo.AE06X0eK3LK',
    'male',
    true,
    'software developer',
    'IT',
    '20, surulere, Lagos'
  );

  await createUser(
    'teebae@gmail.com',
    'taiwo',
    'akinseye',
    '$2b$10$iNkZIHC8.O2.IMttA3scg.ijA2ujMR3NJyM4.Oouo.AE06X0eK3LK',
    'female',
    false,
    'pharmacist',
    'health',
    '20, ile-labowo, Lagos'
  );

  await createUser(
    'bidemikarunwi@gmail.com',
    'bidemi',
    'karunwi',
    '$2b$10$iNkZIHC8.O2.IMttA3scg.ijA2ujMR3NJyM4.Oouo.AE06X0eK3LK',
    'female',
    false,
    'accountant',
    'accounting',
    '20, irede, Lagos'
  );

  // create gif
  await createGif(
    4,
    'https://res.cloudinary.com/an-apluss/image/upload/v1558858859/sample.jpg',
    'love'
  );

  // create article
  await createArticle(4, 'love is a beautiful thing', 'love');
  await createArticle(
    3,
    'washing your teeth regularly aids the health of your mouth',
    'teeth care'
  );

  // create comment
  await createComment(3, null, 1, 'i like the pix. i guess you are in love with someone');
  await createComment(4, 2, null, 'i am safe. I brush my teeth daily twice');
  await createComment(3, 1, null, 'lol... madam love');
})();
