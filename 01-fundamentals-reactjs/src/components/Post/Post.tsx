import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from 'react';

import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Avatar from '../Avatar';
import Comment from '../Comment';

import styles from './Post.module.css';

interface Comment {
  id: number;
  text: string;
  likes: number;
}

const Post: React.FC<{post: Post}> = ({ post: { author, contents, publishedAt } }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState('');

  const authorName = useMemo(() => author.name, [author.name]);

  const publishedDateTitle = useMemo(() => format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  }), [format, publishedAt]);

  const publishedDateRelativeToNow = useMemo(() => formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  }), [formatDistanceToNow, publishedAt]);

  const isNewCommentEmpty = useMemo(() => newCommentText.length === 0, [newCommentText]);

  const handleCreateNewComment = useCallback((event: FormEvent) => {
    event.preventDefault();

    setComments((previousState) => [...previousState, {
      id: previousState.length,
      text: newCommentText,
      likes: 0
    }]);

    setNewCommentText('');
  }, [setComments, setNewCommentText, newCommentText]);

  const handleNewCommentChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentText(event.target.value);
  }, []);

  const handleDeleteComment = useCallback((id: number) => {
    setComments((previousState) => previousState.filter((comment) =>
      comment.id !== id
    ));
  }, [setComments]);

  const handleLikeComment = useCallback((id: number) => {
    setComments((previousState) => previousState.map((comment) => {
      return {
        ...comment,
        ...(comment.id === id && { likes: comment.likes + 1 })
      };
    }));
  }, [setComments]);

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{authorName}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateTitle} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {contents.map(({ type, content }) => {
          if (type === 'paragraph') return <p key={content}>{content}</p>;
          else if (type === 'link') return <p key={content}><a>{content}</a></p>;
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={handleNewCommentChange}
        />

        <footer>
          <button
            type="submit"
            disabled={isNewCommentEmpty}
          >
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(({ id, text, likes }) => (
          <Comment
            key={id}
            author={author}
            text={text}
            likes={likes}
            handleDeleteComment={() => handleDeleteComment(id)}
            handleLikeComment={() => handleLikeComment(id)}
          />
        ))}
      </div>
    </article>
  );
};

export default Post;
