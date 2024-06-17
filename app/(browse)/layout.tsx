import { Container } from '@/components/container'
import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/sidebar'

const BrowseLayout = ({
  children,
} : {
  children: React.ReactNode
}) => {

  return (
    <>
    <Navbar/>

    <div className='flex w-full pt-20'>
        <Sidebar /> 
        <Container> 
          { children } 
        </Container>
    </div>
    </>
  )
}

export default BrowseLayout