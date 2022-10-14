import React, { useState, useContext } from "react"
import { Context } from "./Context"
import { FaStar, FaUser } from "react-icons/fa"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { data } from "autoprefixer"
import ReviewSlider from "./ReviewSlider"
import Spinner from "./Spinner"
import ErrorTxt from "./ErrorText"
import axios from "axios"
import Title from "./Title"

const rateDetails = [
    {
        id: 1,
        desc: "Worst  😞",
    },
    {
        id: 2,
        desc: "Bad  🙁",
    },
    {
        id: 3,
        desc: "Average  😐",
    },
    {
        id: 4,
        desc: "Good  🙂",
    },
    {
        id: 5,
        desc: "Excellent  🤩",
    },
]

const GiveRating = ({ workerId, usersRating, setUsersRating }) => {
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState("")
    const [onHoverStar, setOnHoverStar] = useState(rating)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const navigate = useRouter()

    const { userData } = useContext(Context)

    const handleRate = async () => {
        if (userData == null) {
            return navigate.push(`/users/login`)
        }
        try {
            setIsLoading(true)
            setIsError(false)
            const rate = await axios.post(`http://localhost:3000/api/rate`, {
                workerId,
                userId: userData._id,
                rating,
                review,
            })
            setUsersRating((e) => [...e, rate.data])
            setIsLoading(false)
            setRating(0)
            setOnHoverStar(0)
            setReview("")
            console.log(rate)
        } catch (err) {
            setIsLoading(false)
            setIsError(true)
            console.log(err)
        }
    }

    return (
        <>
            {/* Rate */}
            <section className="bg-gradient-to-br to-sky-400  from-blue-600 w-max mx-auto p-6 rounded-xl min-w-[50%] text-center">
                {/*      desc    */}
                {onHoverStar > 0 ? (
                    <h1 className="text-white text-center mb-10 text-3xl font-semibold my-2">
                        {rateDetails[onHoverStar - 1]?.desc}
                    </h1>
                ) : (
                    <h1 className="text-white text-center mb-10 text-3xl font-semibold my-2">
                        How Was The Service?
                    </h1>
                )}
                {/* Star */}
                <div
                    className="flex gap-x-4 w-max mx-auto"
                    onMouseLeave={() => setOnHoverStar(rating)}
                >
                    {rateDetails.map((data) => (
                        <Star
                            key={data.id}
                            data={data}
                            setOnHoverStar={setOnHoverStar}
                            setRating={setRating}
                            onHoverStar={onHoverStar}
                        />
                    ))}
                </div>
                {/*      review    */}
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="rounded-lg mt-10 w-full outline-0 p-2 bg-sky-100"
                    rows={5}
                    placeholder="Write Review..."
                />
                <motion.button
                    onClick={() => handleRate()}
                    className="px-6 py-2 font-rale bg-white text-blue-500 rounded-lg block mx-auto my-4 mb-6"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.8 }}
                >
                    Rate
                </motion.button>
                {isError && <ErrorTxt />}
                {isLoading && <Spinner />}
            </section>
            {/*      Users Rating    */}
            <Title>Reviews</Title>
            <section>
                <ReviewSlider usersRating={usersRating} />
            </section>
        </>
    )
}

const Star = ({ data, onHoverStar, setOnHoverStar, setRating }) => {
    return (
        <div
            onMouseEnter={() => setOnHoverStar(data.id)}
            onClick={() => setRating(data.id)}
        >
            <FaStar
                className={`${
                    onHoverStar >= data.id ? "text-amber-400" : "text-gray-100"
                } transition-all text-5xl drop-shadow-2xl hover:scale-125`}
            />
        </div>
    )
}

export default GiveRating
