import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Button, Card } from "antd";
import "./style.scss";

import Comment from "../Comment-data";
import LikeIcon from "../../assets/VideoDetail/Like.js";
import DisLikeIcon from "../../assets/VideoDetail/DisLike.js";
import { selectTheme } from "../../redux/Theme/themeSlice.js";

interface CommentDetail {
  id: number;
  title: string;
  profileImage: string;
  userName: string;
  date: string;
  comment: string;
  like: number;
}

function CommentCard() {
  const [isLoading, setIsLoading] = useState(true);
  const [commentData, setCommentData] = useState<CommentDetail[]>([]);

  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data: any[] = await Comment();
      setCommentData(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading &&
        commentData.map((comment: CommentDetail) => (
          <Card
            key={comment.id}
            className={
              theme
                ? "comment-card-template dark"
                : "comment-card-template light"
            }
          >
            <div className="photo">
              <img src={comment.profileImage} alt={comment.title} />
            </div>
            <div className="comment-info">
              <h3>
                {comment.userName} <span>{comment.date}</span>
              </h3>
              <p>{comment.comment}</p>
              <div className="like-dislike-button">
                <Button className="like-button" icon={<LikeIcon />}>
                  {comment.like}
                </Button>
                <Button className="dislike-button" icon={<DisLikeIcon />} />
                <Button type="link">Answer</Button>
              </div>
            </div>
          </Card>
        ))}
    </>
  );
}

export default CommentCard;
