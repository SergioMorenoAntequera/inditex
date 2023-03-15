import { useState } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { getPodcastById } from "../../api/podcast.api"
import { Podcast } from "../../types/Podcast"

function PodcastPage() {
  let params = useParams()
  const { isLoading, error, data: podcast } = useQuery<Podcast>('podcastById', ()=>getPodcastById(params.podcastId ?? ''))
  
  if(!podcast || params.podcastId != podcast?.id) return
  if(isLoading || error || !podcast) return

  return (<div className="grid grid-cols-[30%_auto] gap-6"> 

    <div className="border shadow p-6 rounded">
      
      <div>
        <img className="m-auto w-[90%]" src={podcast.images[0].url} />
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
        Episodes: 
      </div>

      <div className="border shadow p-6 rounded mt-6">
        Lista de episodios
      </div>
    </div>

  </div>)
}

export default PodcastPage