
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { RouterProvider } from "react-router-dom";
import appRouter from './pages/_router';
import { redirect } from "react-router-dom";
 
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>


      <div className='p-4 w-full border-b-slate-600 border-b'>
        <p className='text-lg font-bold text-blue-500'> Podcasters </p>    
      </div>

      <div className='m-auto container p-4 bg-slate-300'>
        <RouterProvider router={appRouter}/>
      </div>
    
    </QueryClientProvider>
  )
}



export default App
