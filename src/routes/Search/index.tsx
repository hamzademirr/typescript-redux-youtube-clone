import { useSearchParams } from 'react-router-dom';
import VideoSearchCard from '../../components/video-search-card';
import './style.scss';

function search() {
  let [searchParams] = useSearchParams();
  document.title = searchParams.get('q') || '';
  return (
    <div className='serach-container'>
      <VideoSearchCard />
    </div>
  )
}

export default search
