import { build, perBuild, sequence } from '@jackfranklin/test-data-bot'

export const postBuilder = build('Post', {
  fields: {
    id: sequence(),
    user: {
      name: 'Santiago',
    },
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
    likes: [
      {
        user: {
          name: 'Martin'
        }
      },
      {
        user: {
          name: 'Thomas'
        }
      }
    ],
    comments: [
      {
        username: 'Lisbeth',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
        likes: 10
      }
    ],
    createdAt: '12/Jun/20',
  }
});
