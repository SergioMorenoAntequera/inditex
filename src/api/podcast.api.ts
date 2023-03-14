import { Podcast, PodcastImage } from "../types/Podcast";
import AXIOS_CLIENT from "./client.api";

// PROXIS ////////////////////////////////////////////////////////////////////
// Instead of "any" we could create and use a type to match what comes from the api

const topPodcastProxy = (data: any): Podcast => ({
    id: data.id.attributes['im:id'],
    title: data['im:name'].label,
    author: data['im:artist'].label,
    images: data['im:image'].map(topPodcastImageProxy),
    description: data.summary
})

const searchPodcastProxy = (data: any): Podcast => ({
    id: data.trackId,
    title: data.trackName,
    author: data.artistName,
    images: [{url: data.artworkUrl100 }],
    description: data.description,
})

const topPodcastImageProxy = (data: any): PodcastImage => ({
    url: data.label, 
    height: data.attributes.height
})



// CALLS  //////////////////////////////////////////////////////////////////// 

export function getPodcasts() {
    return AXIOS_CLIENT.get('/us/rss/toppodcasts/limit=100/genre=1310/json')
        .then(res => res.data.feed.entry.map(topPodcastProxy))
} 

export function getPodcastById(podcastId: string) {
    return AXIOS_CLIENT.get(`/search?term=${podcastId}&media=podcast`)
        .then(res => searchPodcastProxy(res.data.results[0]))
} 