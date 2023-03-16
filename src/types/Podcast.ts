import { Episode } from "./Episode"

export type Podcast = {
    id: string
    title: string
    author: string
    description: string
    images: PodcastImage[]
    moreInfoUrl: string
    episodes?: Episode[]
}

export type PodcastImage = {
    url: string 
    height?: number
}