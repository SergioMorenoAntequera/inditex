import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { getPodcasts } from "../../api/podcast.api"
import { Podcast } from "../../types/Podcast"
import { useNavigate } from 'react-router-dom';



const Root = () => {

  const { isLoading, error, data } = useQuery('toppodcasts', getPodcasts)
  
  const [podcasts, setPodcasts] = useState<Podcast[]>(data)
  const [filterText, setFilterText] = useState("")

  useEffect(() => { 
    if(!data) return
    setPodcasts(data)
  }, [data])

  function filterPodcasts(event: any) {
    const textValue = event.target.value.toLowerCase()
    setFilterText(textValue)
    
    if(!textValue) {
      setPodcasts(data)
      return
    }

    const filteredData = (data as Podcast[])
      .filter(p => (p.author + p.title).toLocaleLowerCase().includes(textValue))
    setPodcasts(filteredData)
  }

  if(isLoading) return <> loading ... </>
  if(error) return <> error... </>
  return (<>
    <div className="flex justify-end gap-4 mb-5"> 
      <p className="p-2 text-white bg-cyan-500 rounded font-bold"> {podcasts?.length} </p>
      <input className="border roudned shadow rounded pl-2" 
        placeholder="Filter podcasts..." 
        value={filterText} onChange={filterPodcasts}
      />
    </div>
    
    <div className="grid grid-cols-4 gap-6">
      {podcasts?.map((podcast: Podcast) => (<PodcastCard podcast={podcast}/>))}
    </div>

  </>)
}


type Props = { podcast: Podcast}
const PodcastCard: React.FC<Props> = ({podcast}) => {
  const navigate = useNavigate()
  
  function seeDetails() {
    navigate(`/podcast/${podcast.id}`);
  }

  return <div key={podcast.id} className='relative h-full cursor-pointer' onClick={seeDetails}>

    <img className="absolute z-10 left-1/2 -translate-x-1/2 rounded-full" src={podcast.images[0].url} alt={podcast.title}/>
    <div className="mt-10 p-4 shadow text-center flex flex-col justify-between rounded">
      <div className="font-bold line-clamp-2" > {podcast.title} </div>
      <div className="text-neutral-500 truncate line-clamp-2"> Author: {podcast.author} </div>
    </div>
  </div>
}

export default Root