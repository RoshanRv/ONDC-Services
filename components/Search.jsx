import React, { useEffect, useState } from "react"

const Search = ({ searchWorker, sortWorker, setFilterTime }) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [filter, setFilter] = useState(false)

    useEffect(() => {
        if (filter == "10" || filter == "30" || filter == "60")
            return setFilterTime(Number(filter))
        else setFilterTime(Number(1000000000))
        searchWorker(searchTerm, filter)
    }, [searchTerm, filter])

    return (
        <section className="px-4  md:p-10 my-2 ">
            <div className="md:flex  gap-x-4 w-full bg-gradient-to-r from-sky-400 to-blue-600 md:p-4 p-2 rounded-lg items-center justify-center ">
                {/*     Search.... */}
                <div className="w-full">
                    <input
                        type="search"
                        placeholder="Search Worker..."
                        className="w-full p-2 rounded-md border border-gray-500 outline-0"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex mt-2 md:mt-0 justify-around gap-x-4">
                    {/*   Filter   */}
                    <div className="">
                        <select
                            onChange={(e) => setFilter(e.target.value)}
                            className="bg-transparent outline-0 text-white border-b-2 border-white p-1"
                        >
                            <option value={""}>--Filter--</option>
                            <option value={true}>Active</option>
                            <option value={false}>Busy</option>
                            <option value={10}>{"< 10 min"}</option>
                            <option value={30}>{"< 30 min"}</option>
                            <option value={60}>{"< 60 min"}</option>
                        </select>
                    </div>
                    {/*   sort  */}
                    <div className="">
                        <select
                            onChange={(e) => sortWorker(e.target.value)}
                            className="bg-transparent outline-0 text-white border-b-2 border-white p-1"
                        >
                            <option value={"_id"}>--Sort--</option>
                            <option value={"name"}>Name</option>
                            <option value={"price"}>Price</option>
                            <option value={"seats"}>Seats</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Search
