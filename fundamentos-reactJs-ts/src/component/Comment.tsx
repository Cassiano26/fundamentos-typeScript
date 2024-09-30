import { ThumbsUp, Trash } from 'phosphor-react';
import styles from './Comment.module.css'
import { Avatar } from './Avatar';
import { useState } from 'react';

interface CommentProps {
    content: string;
    onDeleteComment: (comment:string) => void;
}

export function Comment({content, onDeleteComment}:CommentProps) {
    function handleDeleteComment() {
        onDeleteComment(content);
    }
    const [likeCount, setLikeCount] = useState(0);
    function handleLikeComment() {
        setLikeCount((state) => {
            return state + 1
        });
    }
    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/Cassiano26.png" alt='' />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Cassiano Candido</strong>
                            <time title='11 de maio as 8:13h' dateTime="2022-05-11 08:13:30">Cerca de 1 hora atrás</time>
                        </div>
                        <button onClick={handleDeleteComment} title='Deletar Comentário'>
                            < Trash size={24} />
                        </button>
                    </header>
                    <p>{content}</p>
                </div>
                <footer>
                    <button onClick={handleLikeComment}>
                        < ThumbsUp />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    );
}