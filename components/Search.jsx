import React, { useEffect, useState } from "react"

const Search = ({ searchWorker }) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [filter, setFilter] = useState(false)

    useEffect(() => {
        searchWorker(searchTerm, filter)
    }, [searchTerm, filter])

    return (
        <section className="px-4 md:p-10 ">
            <div className="flex gap-x-4 w-full bg-gradient-to-r from-sky-400 to-blue-600 md:p-4 rounded-lg items-center">
                {/*     Search.... */}
                <div className="w-full">
                    <input
                        type="search"
                        placeholder="Search Worker..."
                        className="w-full p-2 rounded-md border border-gray-500 outline-0"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {/*   Filter   */}
                <div className="">
                    <select onChange={(e) => setFilter(e.target.value)}>
                        <option value={""}>--Filter--</option>
                        <option value={true}>Active</option>
                        <option value={false}>Busy</option>
                    </select>
                </div>
                {/*   sort  */}
                <div className="">
                    <select onChange={(e) => setFilter(e.target.value)}>
                        <option value={""}>--Sort--</option>
                        <option value={true}>Time</option>
                        <option value={false}>Price</option>
                    </select>
                </div>
            </div>
        </section>
    )
}

export default Search
