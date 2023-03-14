import { createBrowserRouter } from "react-router-dom";
import PodcastPage from "./podcasts/PodcastPage";
import Root from   "./root";

const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
    },
    {
      path: "podcasts",
      children: [{
        path: ":podcastId",
        element: <PodcastPage/>,
      }]
    },
]);

export default appRouter