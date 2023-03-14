import { useQuery } from "react-query"


function Root() {
  const { isLoading, error, data } = useQuery('repoData', () =>
        fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
        .then(res => res.json() )
    )

    console.log(data)
    return (
        <div></div>
    )
}

export default Root