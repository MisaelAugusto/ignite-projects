import { Trash, ThumbsUp } from 'phosphor-react'

import Avatar from '../Avatar';

import styles from './Comment.module.css';

interface CommentProps {
  author: Author;
  text: string;
  likes: number;
  handleDeleteComment: () => void;
  handleLikeComment: () => void;
}

const Comment: React.FC<CommentProps> = ({ author, text, likes, handleDeleteComment, handleLikeComment }) => {
  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src={author.avatarUrl} alt="" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{author.name}</strong>
              <time title="07 de Maio às 22h57" dateTime="2023-05-07 22:57:00">Cerca de 1h atrás</time>
            </div>

            <button title="Deletar comentário" onClick={handleDeleteComment}>
              <Trash size={24} />
            </button>
          </header>

          <p>{text}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likes}</span>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Comment;
