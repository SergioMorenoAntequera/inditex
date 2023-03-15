import { Podcast, PodcastImage } from "../types/Podcast";
import { getLocalStorage, setLocalStorage } from "../utils/localStorageUtils";
import AXIOS_CLIENT, { NO_CORS_AXIOS_CLIENT } from "./client.api";
import convert from 'xml-js'
import { getEpisodesById } from "./episode.api";

const podcastCache = "podcasts.cache"

// PROXIS ////////////////////////////////////////////////////////////////////
// Instead of "any" we could create and use a type to match what comes from the api

const apiAlloriginsWinProxy = (res:any) => (JSON.parse(res.data.contents))

const topPodcastProxy = (data: any): Podcast => ({
    id: data.id.attributes['im:id'],
    title: data['im:name'].label,
    author: data['im:artist'].label,
    images: data['im:image'].map(topPodcastImageProxy),
    description: data.summary.label,
    moreInfoUrl: ''
})

const searchPodcastProxy = (data: any): Podcast => ({
    id: data.collectionId,
    title: data.trackName,
    author: data.artistName,
    images: [{url: data.artworkUrl600 }],
    description: data.description,
    moreInfoUrl: data.feedUrl
})

const topPodcastImageProxy = (data: any): PodcastImage => ({
    url: data.label, 
    height: data.attributes.height
})



// CALLS  //////////////////////////////////////////////////////////////////// 

export function getPodcasts() {
    
    // Check in the cache
    return getLocalStorage<Podcast[]>(podcastCache)
        .then(data =>  data)
        .catch(_ => (
            AXIOS_CLIENT
            .get('/us/rss/toppodcasts/limit=100/genre=1310/json')
            .then(res => {
                const allPodcasts = res.data.feed.entry.map(topPodcastProxy)
                setLocalStorage(podcastCache, allPodcasts, 1)
                return allPodcasts
            })
        ))
    
} 

export async function getPodcastById(podcastId?: string) {
    if(!podcastId) return

    // I do it this way because I want to get something from the query where you get
    // all podcasts like the description(not available when getting by id)
    
    const mixData = Promise.all([
        getLocalStorage<Podcast[]>(podcastCache)
            .then(data => {
                const foundPodcast = data?.find(p => p.id === podcastId)
                if(!foundPodcast) throw new Error()
                return foundPodcast
            })
            .catch(err => null),

        NO_CORS_AXIOS_CLIENT
            .get(`/lookup?id=${podcastId}`)
            .then(res => searchPodcastProxy(apiAlloriginsWinProxy(res).results[0])),
    ])

    
    

    return mixData.then(([cachedPodcast, foundPodcast]) => {

        const mixed:Podcast = {
            ...foundPodcast, 
            description: cachedPodcast?.description ?? '', 
        }
        
        return getEpisodesById(foundPodcast.moreInfoUrl)
        .then(episodes => ({
            ...mixed,
            episodes
        }))
        .catch(error => mixed)

        
    })
    
} 