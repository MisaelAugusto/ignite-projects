import styles from './Header.module.css';

import IgniteLogo from '/ignite-logo.svg';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <img src={IgniteLogo} alt="Logotipo do Ignite" />
      <strong>Ignite Feed</strong>
    </header>
  );
}

export default Header;
