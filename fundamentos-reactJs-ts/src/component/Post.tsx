import { format, formatDistanceToNow } from 'date-fns'
import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

interface Content {
    type: 'paragraph' | 'link';
    content: string;
}
interface Author {
    name: string;
    role: string;
    avatarUrl: string
}

export interface PostType {
    id: number;
    author: Author;
    publishedAt: Date;
    content: Content[];
}

interface postProps {
    post: PostType;
}

export function Post({post}:postProps) {
    const [comments, setComments] = useState([
        'post muito bacana, Hein?'
    ])
    const [newCommentText, setNewCommentText] = useState('')
    const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'");
    const publishedDateRelativeNow = formatDistanceToNow(post.publishedAt, {
        addSuffix: true,
    });
    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault()
        
        setComments([...comments, newCommentText]);
        setNewCommentText('');
    }
    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }
    function deleteComment(commentToDelete: string) {
        const commentWithoutDeletedOne = comments.filter(comment => {
            return comment != commentToDelete;
        });
        setComments(commentWithoutDeletedOne);
    }
    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório!')
    }
    const isNewCommentEmpty = newCommentText.length == 0;
    return (
        <article className={styles.post}>
                <header>
                    <div className={styles.author}>
                        < Avatar src={post.author.avatarUrl} />
                        <div className={styles.authorInfo}>
                            <strong>{post.author.name}</strong>
                            <span>{post.author.role}</span>
                        </div>
                    </div>
                    <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>{publishedDateRelativeNow}</time>
                </header>
                <div className={styles.content}>
                    {/* <p>Fala galeraa 👋</p>
                        <p>Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀</p>
                        <p><a href="">👉 jane.design/doctorcare</a></p>
                        <p><a href="">#novoprojeto #nlw #rocketseat</a></p> */
                        post.content.map(line => {
                            if (line.type == 'paragraph') {
                                return <p key={line.content}>{line.content}</p>;
                            } else if(line.type == 'link') {
                                return <p key={line.content}><a href="#">{line.content}</a></p>
                            }
                        })
                    }
                </div>
                <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                    <strong>Deixe seu feedback</strong>
                    <textarea required onInvalid={handleNewCommentInvalid} value={newCommentText} onChange={handleNewCommentChange} name='comment' placeholder='deixe seu comentário'></textarea>
                    <footer>
                        <button disabled={isNewCommentEmpty} type='submit' >Publicar</button>
                    </footer>
                </form>
                <div className={styles.commentList}>
                    {comments.map(comment => {
                        return < Comment key={comment} content={comment} onDeleteComment={deleteComment} />
                    })}
                </div>
            </article>
    )
}