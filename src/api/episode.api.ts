import { Podcast, PodcastImage } from "../types/Podcast";
import { getLocalStorage, setLocalStorage } from "../utils/localStorageUtils";
import AXIOS_CLIENT, { NO_CORS_AXIOS_CLIENT, prepareNoCORS } from "./client.api";
import convert from 'xml-js'
import { Episode } from "@/types/Episode";

const podcastCache = "podcasts.cache"

// PROXIS ////////////////////////////////////////////////////////////////////

type T = {name:string, elements:any[]}
const episodeProxy = (data: T[]): Episode | undefined => {
    if(!data) return

    // To confirm non-equaily structured data
    let duration:string = data.find(d => d.name === "itunes:duration")?.elements[0].text
    if(!duration.includes(':')) {
        const durationNum = parseInt(duration)
        let hours = Math.floor(durationNum / 3600)
        let minutes = Math.floor((durationNum - (hours * 3600)) / 60)
        let remainingSeconds = durationNum - (hours * 3600) - (minutes * 60)
        duration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    let title =  data.find(d => d.name === "title")?.elements[0].text
    ?? data.find(d => d.name === "title")?.elements[0].cdata 

    return {
        title,
        duration,
        id: data.find(d => d.name === "guid")?.elements[0].text,
        author: data.find(d => d.name === "itunes:author")?.elements[0].text,
        description: data.find(d => d.name === "itunes:summary")?.elements[0].text,
        pubDate: new Date(data.find(d => d.name === "pubDate")?.elements[0].text),
    }
}

const xmlResponseProxy = (data: any) => {
    return data.elements[0].elements[0].elements
        .filter((i: any) => i.name === 'item')
        .map((i: any) => episodeProxy(i.elements))
}

// CALLS  //////////////////////////////////////////////////////////////////// 

export function getEpisodesById(xmlUrl: string) {

    return fetch(xmlUrl)
        .then(response => response.text())
        .then(str => JSON.parse(convert.xml2json(str)))
        .then(data => xmlResponseProxy(data));
} 
