import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks.tsx";
import { Button, Input } from "antd";
import { useSearchParams } from "react-router-dom";
import "./style.scss";

import CommentCard from "../../components/Comment-card/index.tsx";
import LikeIcon from "../../assets/VideoDetail/Like.tsx";
import DisLikeIcon from "../../assets/VideoDetail/DisLike.tsx";
import ShareIcon from "../../assets/VideoDetail/Share.tsx";
import MenuIcon from "../../assets/VideoDetail/Menu.tsx";
import OptionsIcon from "../../assets/VideoDetail/Options.tsx";
import VideoDetailCard from "../../components/Video-detail-card/index.tsx";
import DefaultProfilPhoto from "../../assets/VideoDetail/default-profil-photo.png";

import { selectTheme } from "../../redux/Theme/themeSlice.tsx";
import {
  selectChannelData,
  selectVideoData,
  fetchVideo,
  fetchVideoChannelData,
  selectVideoIsLoading,
} from "../../redux/Video/VideoSlice.tsx";
import Loading from "../../components/Loading/index.tsx";

interface VideoDetail {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: { high: { url: string } };
    description: string;
    channelId: string;
  };
}
function Detail() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const theme = useAppSelector(selectTheme);
  const videoData = useAppSelector(selectVideoData);
  const channelData = useAppSelector(selectChannelData);
  const isLoading = useAppSelector(selectVideoIsLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoResponse = await dispatch(
          fetchVideo(searchParams.get("q") || "")
        );
        const videoData: VideoDetail[] = await videoResponse.payload.items;
        const channelIds = videoData.map((video) => video.snippet.channelId);
        const channelDataPromises = channelIds.map((channelId) =>
          dispatch(fetchVideoChannelData(channelId))
        );
        await Promise.all(channelDataPromises);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [dispatch, searchParams]);

  const formatDescription = (description: string) => {
    const paragraphs = description.split("\n");
    if (paragraphs.length > 4 && !showFullDescription) {
      return paragraphs
        .slice(0, 4)
        .map((paragraph, index) => <p key={index}>{paragraph}</p>);
    }
    return paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="video-detail-container">
      {isLoading && <Loading />}
      {!isLoading &&
        videoData.map((video: VideoDetail, index) => (
          <div
            className={theme ? "video-side dark" : "video-side light"}
            key={index}
          >
            <iframe
              className="video-frame"
              src={`https://www.youtube.com/embed/${searchParams.get("q")}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <div className="video-info">
              <h1>{video.snippet.title}</h1>
              <div className="chanel">
                <div className="chanel-info">
                  {channelData[index] && (
                    <img
                      src={channelData[index].snippet.thumbnails.default.url}
                      alt={channelData[index].snippet.title}
                    />
                  )}
                  <div className="chanel-name">
                    <h3>{video.snippet.channelTitle}</h3>
                    <p>291 B abone</p>
                  </div>
                  <Button className="subscribe-button">Subscribe</Button>
                </div>
                <div className="like-unlike-share">
                  <Button className="like-button" icon={<LikeIcon />}>
                    {Number(`${Math.random()}`.slice(0, 3)) * 1000 + 1}K
                  </Button>
                  <Button className="dislike-button" icon={<DisLikeIcon />} />
                  <Button className="share-button" icon={<ShareIcon />}>
                    Share
                  </Button>
                  <Button
                    className="options-button"
                    shape="circle"
                    icon={<OptionsIcon />}
                  />
                </div>
              </div>
            </div>
            <div className="explanation">
              <h3>89 B görüntüleme 1 yıl önce</h3>
              {formatDescription(video.snippet.description)}
              {video.snippet.description.split("\n").length > 4 && (
                <Button type="link" onClick={toggleDescription}>
                  {showFullDescription ? "Hide" : "Show more"}
                </Button>
              )}
            </div>
            <div className="comment">
              <div className="comment-nav">
                <div className="info">
                  <h2>9 Yorum</h2>
                  <Button type="text" icon={<MenuIcon />}>
                    Sorting Measure
                  </Button>
                </div>
                <div className="comment-write">
                  <img src={DefaultProfilPhoto} alt="" />
                  <Input className="comment-input" placeholder="Add Comment" />
                </div>
              </div>
              <CommentCard />
            </div>
          </div>
        ))}
      {!isLoading &&
        videoData.map((video) => (
          <div className="next-video">
            <VideoDetailCard videoTitle={video.snippet.title} />
          </div>
        ))}
    </div>
  );
}

export default Detail;
