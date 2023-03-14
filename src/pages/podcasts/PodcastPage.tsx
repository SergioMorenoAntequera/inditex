import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { getPodcastById } from "../../api/podcast.api"

function PodcastPage() {
  let params = useParams()
  const { isLoading, error, data } = useQuery('podcastById', ()=> getPodcastById(params.podcastId ?? ''))
  

  return (<div className="grid grid-cols-2"> 
    
  </div>)
}

export default PodcastPage