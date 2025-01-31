import Link from 'next/link'
import React from 'react'

const RelatedSearch = () => {
  return (
    <div className='relatedsearch mt-[2rem] mb-[3rem]'>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
          <div className="btn-genre row gap-3 flex justify-center items-center mt-2">
              <Link href="/search?q=anime" className="btn col-md-1">Anime</Link>
              <Link href="/search?q=marvel" className="btn col-md-1">Marvel</Link>
              <Link href="/search?q=cars" className="btn col-md-1">Cars</Link>
              <Link href="/search?q=windows" className="btn col-md-1">Windows </Link>
       
              <Link href="/search?q=programmer" className="btn col-md-2">Programmer</Link>
              <Link href="/search?q=coding" className="btn col-md-1">Coding</Link>
              <Link href="/search?q=technology" className="btn col-md-1">Teknologi</Link>
              <Link href="/search?q=business" className="btn col-md-1">Business</Link>
              <Link href="/search?q=computer" className="btn col-md-1">Computer</Link>
              <Link href="/search?q=vector" className="btn col-md-1">Vector</Link>
              <Link href="/search?q=dark" className="btn col-md-1">Dark</Link>
              <Link href="/search?q=glowing" className="btn col-md-1">Glowing</Link>
              <Link href="/search?q=mountains" className="btn col-md-1">Mountains</Link>
              <Link href="/search?q=sunset" className="btn col-md-1">sunset</Link>
              <Link href="/search?q=design" className="btn col-md-1">design</Link>
              <Link href="/search?q=landscape" className="btn col-md-1">landscape</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RelatedSearch
