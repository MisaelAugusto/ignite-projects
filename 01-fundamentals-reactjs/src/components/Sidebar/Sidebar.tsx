import { PencilLine } from 'phosphor-react';

import Avatar from '../Avatar';

import styles from './Sidebar.module.css';

interface SidebarProps {
  cover: string;
  avatar: string;
  user: string;
  role: string;
}

const Sidebar: React.FC<SidebarProps> = ({ cover, avatar, user, role }) => {
  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src={cover}
      />

      <div className={styles.profile}>
        <Avatar src={avatar} />

        <strong>{user}</strong>
        <span>{role}</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  );
};

export default Sidebar;
