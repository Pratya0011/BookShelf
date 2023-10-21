import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { fetchDiscoveryBooks, fetchPremiumBooks, fetchRomanticBooks } from '../features/BooksSlice'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Discover() {
    const selector = useSelector(state=> state.books.discoverBooks)
    const loading = useSelector(state=>state.books.loading)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchDiscoveryBooks())
    },[dispatch])
console.log(selector)
  return (
    <div>
        {loading?(<Skeleton />):(
            <div >
                {selector && selector.books && selector.books.length>0>0 && (
                    <div className='flex'>
                    {selector.books.map((item,index)=>(
                        <div key={index} >
                            <img src={item.image}/>
                            <div>
                                <span>{item.price}</span>
                                <span>
                                    <button>Buy</button>
                                </span>
                            </div>
                        </div>
                    ))}
                    </div>
                )}
            </div>
        )}
    </div>
  )
}

export default Discover