import React from "react";
import Nav from "./Nav";
import book from '../Image/book.jpg'
import Discover from "./Discover";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Library() {
  return (
    <div>
      {<Nav /> || <Skeleton/>}
      <div className="mt-16 ">
        <div className="flex bg-slate-100">
        <div className="w-3/6 h-50 flex justify-center flex-col p-10">
          <div className="text-5xl font-semibold ">What to read next?</div>
          <p className="text-zinc-400 font-semibold pt-6">You're in the right place. Select books of your choice and starting reading!</p>
        </div>
        <div className="flex justify-center items-center h-50 p-10 pl-20">
        <img src="http://books.google.com/books/content?id=Wi7yDwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api" height='150px' width='150px' />
          <img src='http://books.google.com/books/content?id=nB5gEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' height='160px' width='160px' className="z-10"/>
          <img src="http://books.google.com/books/content?id=qYr5zgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api" height='150px' width='150px' />
        </div>
        </div>
        <Discover/>
      </div>
    </div>
  );
}

export default Library;
