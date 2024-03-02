import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { Card } from "antd";
import { useSearchParams, NavLink } from "react-router-dom";
import "./style.scss";

import { selectTheme } from "../../redux/Theme/themeSlice";
import {
  selectVideoDetailCardData,
  selectVideoDetailCardIsLoading,
  fetchVideoDetailData,
} from "../../redux/VideoDetailCard/VideoDetailCardSlice";
import Loading from "../Loading";

interface Props {
  videoTitle: string;
}

interface VideoDetail {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: { high: { url: string } };
  };
}
function VideoDetailCard({ videoTitle }: Props) {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const theme = useAppSelector(selectTheme);
  const videoData = useAppSelector(selectVideoDetailCardData);
  const isLoading = useAppSelector(selectVideoDetailCardIsLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchVideoDetailData(videoTitle));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading &&
        videoData.map((video: VideoDetail) => (
          <Card
            className={
              theme
                ? "video-detail-card-template dark"
                : "video-detail-card-template light"
            }
          >
            <NavLink
              className="navlink-template"
              to={`/detail?q=${video.id.videoId}`}
            >
              <div className="video-image">
                <img
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                />
              </div>
              <div className="video-info">
                <div className="video-title">
                  <h3>{video.snippet.title}</h3>
                  <p>{video.snippet.channelTitle}</p>
                  <p>
                    {Number(`${Math.random()}`.slice(0, 3)) * 1000 + 1}K Views -{" "}
                    {`${Math.floor(Math.random() * 7) + 1}`} days ago
                  </p>
                </div>
              </div>
            </NavLink>
          </Card>
        ))}
    </>
  );
}

export default VideoDetailCard;
