import { useParams } from "react-router-dom"

function PodcastPage() {
  let params = useParams()
  console.log(params)
  
  return (
    <div>podcasts details</div>
  )
}

export default PodcastPage