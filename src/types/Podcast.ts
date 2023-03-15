
export type Podcast = {
    id: string
    title: string
    author: string
    description: string
    images: PodcastImage[]
    moreInfoUrl: string
}

export type PodcastImage = {
    url: string 
    height?: number
}