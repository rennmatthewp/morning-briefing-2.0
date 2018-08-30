exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('saved_stories')
    .del()
    .then(() =>
      knex('locations')
        .del()
        .then(() => knex('users').del())
    )
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('users')
          .insert(
            {
              email: 'yo@yoma.com',
              firstName: 'yo',
              lastName: 'yoma'
            },
            'id'
          )
          .then(user => {
            return Promise.all([
              knex('locations').insert([
                {
                  city: 'Denver',
                  state: 'CO',
                  zipcode: '80218',
                  weatherStation: 'Alamo Placita',
                  user_id: user[0]
                },
                {
                  city: 'New York',
                  state: 'NY',
                  zipcode: 10021,
                  weatherStation: 'Upper East Side',
                  user_id: user[0]
                }
              ]),
              knex('saved_stories').insert([
                {
                  abstract:
                    'Races for governor have often yielded centrist candidates. Voters in Florida, Oklahoma and Arizona chose a different route. And women, once again, made a strong showing in House races.',
                  byline: 'By ALEXANDER BURNS',
                  caption:
                    'Supporters of Andrew Gillum cheered at his primary night party on Tuesday.',
                  thumbnail:
                    'https://static01.nyt.com/images/2018/08/30/us/politics/30TAKEAWAYS1/merlin_142938105_28b0df59-ae7a-4159-8ddb-77d554e5a541-articleInline.jpg',
                  title: '4 Takeaways from Tuesday’s Primaries',
                  url:
                    'https://www.nytimes.com/2018/08/29/us/politics/arizona-florida-election.html',
                  user_id: user[0]
                },
                {
                  abstract:
                    'With Mr. Gillum’s upset victory, the governor’s race will feature two young, hard-charging politicians who represent the beating heart of their parties.',
                  byline: 'By PATRICIA MAZZEI and JONATHAN MARTIN',
                  caption:
                    'Andrew Gillum, the mayor of Tallahassee, is an outspoken progressive.',
                  thumbnail:
                    'https://static01.nyt.com/images/2018/08/29/us/29PRIMARIES-promo/29PRIMARIES-promo-thumbLarge-v2.jpg',
                  title:
                    'A Black Progressive and a Trump Acolyte Win Florida Governor Primaries',
                  url:
                    'https://www.nytimes.com/2018/08/28/us/politics/florida-arizona-election-results.html',
                  user_id: user[0]
                }
              ])
            ])
              .catch(error => console.log(`Error seeding data: ${error}`));
          })
      ]).catch(error => console.log(`Error seeding data: ${error}`));
    });
};
