import axios from "axios";
import { useState } from "react";

const AddPhoto = (props) => {
    const { handleAddPhoto } = props
    const [randomNumArr, setRandomNumArr] = useState([])


    const handleOnClickAdd = async () => {
        let randomNumber = ''
        let randomNumArrCopy = [...randomNumArr]

        do {
            randomNumber = Math.floor(Math.random() * 90) + 11

        } while (randomNumArrCopy.includes(randomNumber))

        if (!randomNumArrCopy.includes(randomNumber)) {
            randomNumArrCopy.unshift(randomNumber)
            setRandomNumArr(randomNumArrCopy)
        }

        let newPhoto = {
            id: '',
            download_url: '',
            width: '',
            height: '',
        }
        let res = await axios.get('https://picsum.photos/v2/list?page=2&limit=100')
        if (res && res.data) {
            newPhoto = {
                id: randomNumber,
                download_url: res.data[randomNumber].download_url,
                width: res.data[randomNumber].width,
                height: res.data[randomNumber].height,
            }
            handleAddPhoto(newPhoto)
        }


    }


    return (
        <>
            <button className='btn-add' onClick={() => handleOnClickAdd()}>+</button>
        </>

    )

}

export default AddPhoto;