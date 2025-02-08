import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";

import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "./Playbutton.jsx";

import VideoPopup from "../../../components/videoPopup/VideoPop.jsx";

const DetailsBanner = ( {video,crew }) => {

const { mediaType,id} = useParams();
  const {data,loading} = useFetch(`/${mediaType}/${id}`)

  const { url } = useSelector((state)=>state.home);
  const directors =  crew?.filter((f)=>f.job === "Director")
  const writers  = crew?.filter((f)=> f.job==="Screenplay"|| f.job === "Writer")

  const [show,setShow] = useState(false)
  const [videoId,setVideoId] =  useState(null)
  

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                             <div className="backdrop-img">
                                <Img src={url.backdrop +data.backdrop_path} /> 
                             </div>
                             <div className="opacity-layer"></div>
                             <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {data.poster_path ? (
                                            <Img 
                                               className="posterImg"
                                               src={
                                                url.backdrop +
                                                data.poster_path
                                               }
                                            />
                                        ) : (
                                            <Img 
                                                className="posterImg"
                                                src={PosterFallback}
                                            />
                                        )}
                                    </div>
                                    <div className="right" ><div className="title">
                                      
                                      {`${data.name || data.title} (${dayjs(data?.release_date).format("YYYY")})`}
                                     </div>
                                     <div className="subtitle">
                                         {data?.tagLine}
                                     </div>
                                     <div className="row">
                                       <CircleRating rating={data.vote_average.toFixed(1)}  className=" circle" />

                                       <div className="playbtn"
                                       onClick={()=>{
                                        setShow(true)
                                        
                                       }}>
                                        <PlayIcon />
                                        <span className="text">Watch Trailer</span>
                                       </div>
 
                                     </div>

                                     <div className="overview">
                                        <div className="heading">Overview</div>
                                        <div className="description">{data.overview}</div>
                                     </div>

                                     <div className="info">
                                        {data.status && (
                                            <div className="infoItem">
                                                <span className="text bold">Status:</span>
                                                <span className="text">{data.status}</span>
                                            </div>
                                        )}
                                        {data.release_date && (
                                            <div className="infoItem">
                                                <span className="text bold">Release Date:</span>
                                                <span className="text">{data.release_date}</span>
                                            </div>
                                        )}
                                        {data.runtime && (
                                            <div className="infoItem">
                                                <span className="text bold">Runtime:</span>
                                                <span className="text">{toHoursAndMinutes(data.runtime)}</span>
                                            </div>
                                        )}
                                      
                                        
                                     </div>
                                     {directors.length>0 && (
                                            <div className="info">
                                                <span className="text bold">Director:{" "}</span>
                                                <span className="text">{directors?.map((d,i)=>(
                                                    <span key={i}>{d.name}
                                                    {directors.length - 1 !== i && ", "}</span>
                                                ))}</span>
                                            </div>
                                        )}
                                        {writers.length>0 && (
                                            <div className="info">
                                                <span className="text bold">Writers:{" "}</span>
                                                <span className="text">{writers?.map((d,i)=>(
                                                    <span key={i}>{d.name}
                                                    {writers.length - 1 !== i && ", "}</span>
                                                ))}</span>
                                            </div>
                                        )}
                                    
                                    
                                        
                                     
                                    </div>
                                        
                                    
                                    
                                </div>
                                <VideoPopup 
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />
                             </ContentWrapper>
                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;