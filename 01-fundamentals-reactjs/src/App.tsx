import { Header, Sidebar, Post } from 'components';

import styles from './App.module.css';

import './global.css';


const posts: Post[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/MisaelAugusto.png',
      name: 'Misael Augusto',
      role: 'Frontend Tech Lead'
    },
    contents: [
      { type: 'paragraph', content: 'Fala galera 👋' },
      { type: 'paragraph', content: 'Esse é o meu primeiro post aqui no Ignite Feed 🚀' },
      { type: 'link', content: 'https://github.com/MisaelAugusto/ignite-project-1' },
    ],
    publishedAt: new Date('2023-05-09 22:49:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/MisaelAugusto.png',
      name: 'Misael Augusto',
      role: 'Frontend Tech Lead'
    },
    contents: [
      { type: 'paragraph', content: 'Fala galera 👋' },
      { type: 'paragraph', content: 'Esse é o meu segundo post aqui no Ignite Feed 🚀' },
      { type: 'link', content: 'https://github.com/MisaelAugusto/ignite-project-1' },
    ],
    publishedAt: new Date(),
  },
];

const App = () => {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar
          cover="https://images.unsplash.com/photo-1579403124614-197f69d8187b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
          avatar="https://avatars.githubusercontent.com/u/30798460?v=4"
          user="Misael Augusto"
          role="Software Engineer"
        />

        <main>
          {posts.map((post) => (
            <Post
              key={post.id}
              post={post}
            />
          ))}
        </main>
      </div>
    </div>
  );
}

export default App;
