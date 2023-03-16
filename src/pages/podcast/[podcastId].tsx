import { getPodcastById } from "@/api/podcast.api"
import { useQuery } from "react-query"
import { useRouter } from 'next/router'
import { useEffect } from "react"
import convert from 'xml-js'
import { Episode } from "@/types/Episode"
import Link from "next/link"

function PodcastPage() {
  const router = useRouter()
  const { podcastId = '' } = router?.query

  const { isLoading, error, data: podcast, refetch } = useQuery('podcastById', async () => getPodcastById(podcastId.toString()))
  
  useEffect(() => {
    if(!podcastId) return
    refetch()
  }, [podcastId, refetch])
  
  if(!podcast) return
  if(isLoading || error || !podcast) return

  return (<div className="grid grid-cols-[30%_auto] gap-6"> 

    <div className="border shadow p-6 rounded">
      
      <div>
        <img className="m-auto w-[90%]" src={podcast.images[0].url} alt={podcast.title} />
      </div>

      <div className="border-b border-b-neutral-300 my-6"/>

      <p className="font-bold"> {podcast.title} </p>
      <p> <span className="italic"> by </span> {podcast.author} </p>


      {podcast.description && <>
        <div className="border-b border-b-neutral-300 my-6"/>
        <p className="font-bold"> Description: </p>
        <p className="line-clamp-5" title={podcast.description}> {podcast.description} </p>
      </>}

    </div>

    <div>
      <div className="border shadow p-6 rounded text-lg font-bold">
        <p> Episodes: {podcast.episodes?.length} </p> 
      </div>

      <div className="border shadow p-6 rounded mt-6">
        <div className="grid grid-cols-[auto_7rem_5rem] font-bold border-b"> 
          <p> Title </p>
          <p> Date </p>
          <p> Duration </p>
        </div>

        <div className="[:nth-child(odd)]:bg-red-500">
          { podcast.episodes?.map((episode: Episode, i:number) => {
            
            
            return <Link key={i} href={`${router.asPath}`}>
              <div className={`grid grid-cols-[auto_7rem_5rem] py-2 px-1 border-b ${i % 2 ? 'bg-slate-200': ''}`}> 
                <p> {episode.title} </p>
                <p> {episode.pubDate.toLocaleDateString("en-US")} </p>
                <p> {episode.duration} </p>
              </div>
            </Link>
          })}
        </div>
        
      </div>
    </div>

  </div>)
}

export default PodcastPage