import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'
import NextNProgress from 'nextjs-progressbar';

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return <QueryClientProvider client={queryClient}>
    
    <div className='p-4 w-full border-b-slate-600 border-b'>
      <p className='text-lg font-bold text-blue-500 cursor-pointer' onClick={()=>router.push("/")}> Podcasters </p>    
    </div>

    <div className='p-4 '>
      <NextNProgress />
      <Component {...pageProps} />
    </div>

  </QueryClientProvider>
}
