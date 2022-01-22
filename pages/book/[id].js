// export async function getStaticProps({ params }) {}

export default function Book() {
  return (
    <div className='min-h-screen flex'>
      <div className='m-auto text-center tracking-wide'>
        <p className='text-4xl font-semibold'>{ 'T\'es moche' }</p>
        <p className='text-sm'>(genre vraiment)</p>
      </div>
    </div>
  )
}