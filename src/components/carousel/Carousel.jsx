import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../../pages/lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";
import CircleRating from "../circleRating/CircleRating";

function Carousel({data,loading,endpoint}) {

  const carouselContainer = useRef()
  const {url} = useSelector(state => state.home)
  const naviagte = useNavigate();

  const navigation = (dir)=>{

     const container =  carouselContainer.current;

     const scrollAmount = dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20)
     
     console.log(scrollAmount)

     {container.scrollTo({
        left: scrollAmount,
        behaviour: "smooth"
     })}

  }
  const skItem = ()=>{
    <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
            <div className="title skeleton"></div>
            <div className="title skeleton"></div>
        </div>
    </div>
  }



  return (
    <div className="carousel">
      <ContentWrapper >
        <BsFillArrowLeftCircleFill 
          className="carouselLeftNav arrow"
          onClick={()=>navigation("left")}
        />
        <BsFillArrowRightCircleFill 
          className="carouselRightNav arrow"
          onClick={()=>navigation("right")}
        />
        
        {!loading ? (
          <div className="carouselItems"
          ref={carouselContainer}>
           {
            data?.map((item)=>{
                const posterUrl = item.poster_path ? url.poster + item.poster_path:PosterFallback;
                return(
                    <div 
                    key={item.id}
                    className="carouselItem" onClick={()=>naviagte(`/${item.media_type || endpoint }/${item.id}`)}>
                     <div className="posterBlock">
                       <Img  src={posterUrl} />
                       <CircleRating rating ={item.vote_average.toFixed(1)} />
                     </div>
                     <div className="textBlock">
                        <span className="title">
                          {item.title || item.name}

                        </span>
                        <span className="title">
                          {dayjs(item.release_Date).format("MMM D,YYYY")}

                        </span>
                     </div>

                    </div>
                       

               
                )
            })
           }

          </div>
          
        ): (
            <div className="loadingSkeleton">
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
            </div>
        )}
        
      </ContentWrapper>
    </div>
  )
}

export default Carousel