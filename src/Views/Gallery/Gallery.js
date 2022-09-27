import React, { useRef } from 'react'
import './Gallery.scss'
import { useEffect, useState } from 'react'
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5"
import AddPhoto from './AddPhoto'
import useFetch from '../../Customize/Fetch'


import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Gallery = () => {

    const [gallery, setGallery] = useState([])
    const [imgUrl, setImgUrl] = useState()
    const [currentIndexImg, setCurrentIndexImg] = useState()
    const [show, setShow] = useState(false)
    const indexImg = useRef()

    const { data: dataImgs, isLoading } =
        useFetch(`https://picsum.photos/v2/list?page=1&limit=15`)


    useEffect(() => {
        let dataImgsCopy = [...dataImgs]
        for (const item of dataImgsCopy) {
            if (item.width < item.height) {
                dataImgsCopy.splice(dataImgsCopy.indexOf(item), 1)
            }
        }

        if (dataImgsCopy && dataImgsCopy.length > 0) {
            setGallery(dataImgsCopy)
        }


    }, [dataImgs])


    const handleAddPhoto = (photo) => {
        let newGallery = [...gallery]
        newGallery.unshift(photo)
        setGallery(newGallery)
    }

    const handleOnClickImg = (photo) => {
        setImgUrl(photo.download_url)
        setCurrentIndexImg(gallery.indexOf(photo))
        setShow(true)
    }

    const handleBackBtn = () => {
        if (currentIndexImg === 0) {
            indexImg.current = gallery.length - 1
        } else indexImg.current = currentIndexImg - 1
        setCurrentIndexImg(indexImg.current)
        setImgUrl(gallery[indexImg.current].download_url)
    }

    const handleForwardBtn = () => {
        if (currentIndexImg === gallery.length - 1) {
            indexImg.current = 0
        } else indexImg.current = currentIndexImg + 1
        setCurrentIndexImg(indexImg.current)
        setImgUrl(gallery[indexImg.current].download_url)
    }

    const handleClose = () => {
        setShow(false)
        setCurrentIndexImg()
    }

    return (

        <div div className='gallery-wrapper' >
            <div className='gallery-header'>
                <h2>GALLERY</h2>
                <AddPhoto
                    handleAddPhoto={handleAddPhoto}
                />
            </div>

            <div className='gallery-body'>
                <Swiper
                    slidesPerView={5}
                    spaceBetween={30}
                    navigation={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Navigation]}
                    className="gallery-photo mySwiper"
                >
                    {gallery && gallery.length > 0 &&
                        gallery.map(item => {
                            return (
                                <SwiperSlide key={item.id}>
                                    <img className='gallery-photo-detail' src={item.download_url} alt="error img"
                                        onClick={() => handleOnClickImg(item)}
                                    />
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>

            {
                show ?
                    <div className='gallery-show'>
                        <div className='gallery-show-photo' >
                            <img src={imgUrl} alt='error' />
                            <IoClose className='btn-close' onClick={() => handleClose()} />
                            <IoChevronBack className='btn-prev' onClick={() => handleBackBtn()} />
                            <IoChevronForward className='btn-next' onClick={() => handleForwardBtn()} />
                        </div>
                    </div>
                    : ''
            }

            {
                isLoading === true &&
                <div className='loading-text' style={{ textAlign: 'center !important', width: '100%' }}>Loading Data...</div>
            }

        </div >
    )
}

export default Gallery;