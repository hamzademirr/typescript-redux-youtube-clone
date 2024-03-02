import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { Card } from "antd";
import { useSearchParams, NavLink } from "react-router-dom";
import "./style.scss";

import { selectTheme } from "../../redux/Theme/themeSlice";
import {
  fetchVideoSearchData,
  fetchChannelSearchData,
  selectVideoSearchCardData,
  selectChannelSearchCardData,
  selectVideoSearchCardIsLoading,
} from "../../redux/VideoSearchCard/VideoSearchCardSlice";
import Loading from "../Loading";

interface VideoDetail {
  id: { videoId: number };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: { high: { url: string } };
    description: string;
    channelId: string;
  };
}
function VideoSearchCard() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const theme = useAppSelector(selectTheme);
  const videoData = useAppSelector(selectVideoSearchCardData);
  const channelData = useAppSelector(selectChannelSearchCardData);
  const isLoading = useAppSelector(selectVideoSearchCardIsLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoResponse = await dispatch(
          fetchVideoSearchData(searchParams.get("q") || "")
        );
        const videoData: VideoDetail[] = await videoResponse.payload.items;
        const channelIds = videoData.map(
          (video: any) => video.snippet.channelId
        );
        const channelDataPromises = channelIds.map((channelId) =>
          dispatch(fetchChannelSearchData(channelId))
        );
        await Promise.all(channelDataPromises);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [dispatch, searchParams]);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading &&
        videoData &&
        videoData.map((video: VideoDetail, index) => (
          <Card
            key={index}
            className={
              theme
                ? "video-search-card-template dark"
                : "video-search-card-template light"
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
                  <p>
                    {Number(`${Math.random()}`.slice(0, 3)) * 1000 + 1}K Views -{" "}
                    {`${Math.floor(Math.random() * 7) + 1}`} days ago
                  </p>
                </div>
                <div className="channel-info">
                  {channelData[index] && (
                    <img
                      src={channelData[index].snippet.thumbnails.default.url}
                      alt={channelData[index].snippet.title}
                    />
                  )}
                  <span>{video.snippet.channelTitle}</span>
                </div>
                <p>{video.snippet.description}</p>
              </div>
            </NavLink>
          </Card>
        ))}
    </>
  );
}

export default VideoSearchCard;
