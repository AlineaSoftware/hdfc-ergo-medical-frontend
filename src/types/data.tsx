import HomeDataOfCase from "src/data/homeDataDetails";

<>
    <div className="col-span-5">
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-greyTable-main text-white-main">
                    <tr>
                        <th className="border border-gray-light px-2 py-1 text-left">Proposal No</th>
                        <th className="border border-gray-light px-2 py-1 text-left">Proposer</th>
                        <th className="border border-gray-light px-2 py-1 text-left">Request Date/Time</th>
                        <th className="border border-gray-light px-2 py-1 text-left">Request ID</th>
                        <th className="border border-gray-light px-2 py-1 text-left">Division</th>
                        <th className="border border-gray-light px-2 py-1 text-left">Unique ID</th>
                        <th className="border border-gray-light px-2 py-1 text-left">Insured</th>
                        <th className="border border-gray-light px-2 py-1 text-left">Test</th>
                        <th className="border border-gray-light px-2 py-1 text-left">Current Status</th>
                        <th className="border border-gray-light px-2 py-1 text-left">Status Date/Time</th>
                    </tr>
                </thead>
                <tbody>
                    {HomeDataOfCase.map((item, index) => (
                        <tr className='bg-greyTable-light text-black' key={index}>
                            <td className='border border-gray-light px-2 py-1'>{item.proposalNumber}</td>
                            <td className='border border-gray-light px-2 py-1'>{item.proposer}</td>
                            <td className='border border-gray-light px-2 py-1'>{item.requestTime}</td>
                            <td className='border border-gray-light px-2 py-1'>{item.requestId}</td>
                            <td className='border border-gray-light px-2 py-1'>{item.division}</td>
                            <td className='border border-gray-light px-2 py-1'>{item.uniqueId}</td>
                            <td className='border border-gray-light px-2 py-1'>{item.insured}</td>
                            <td className='border border-gray-light px-2 py-1'>{item.test}</td>
                            <td className='border border-gray-light px-2 py-1'>{item.status}</td>
                            <td className='border border-gray-light px-2 py-1'>{item.statusDateTime}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    </div>
    <div>
        {HomeDataOfCase?.map((x, i) => (
            <div className='grid grid-cols-5 gap-4'>
                <div className="row-span-4 row-start-2">
                    <div className="max-w-sm mx-auto bg-gray-50 border border-gray-200">
                        <h2 className="text-center text-lg font-semibold text-gray-800 mb-2">Insured</h2>
                        <p className="text-center text-base font-bold text-gray-700 mb-2">{x?.insured}</p>
                        <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                            <div className="text-right font-semibold border-r pr-2"> Gender</div>
                            <div className="col-span-2 pl-2">{x?.insuredDetails?.gender}</div>
                            <div className="text-right font-semibold border-r pr-2"> Age</div>
                            <div className="col-span-2 pl-2">{x?.insuredDetails?.age}</div>
                            <div className="text-right font-semibold border-r pr-2"> DoB</div>
                            <div className="col-span-2 pl-2">{x?.insuredDetails?.dob}</div>
                            <div className="text-right font-semibold border-r pr-2"> Contact</div>
                            <div className="col-span-2 pl-2">
                                {x?.insuredDetails?.contact?.map((x, i) => (<div><p>{x}</p>
                                </div>))}
                            </div>
                            <div className="text-right font-semibold border-r pr-2"> Product</div>
                            <div className="col-span-2 pl-2">
                                {x?.insuredDetails?.product}
                            </div>
                        </div>
                        <div className="mt-4 bg-gray-100 p-2 rounded-md text-center text-xs text-gray-600">
                            <p>Address</p>
                            {x?.insuredDetails?.address}
                        </div>
                    </div>
                </div>

                <div className="col-span-3 row-span-4 col-start-2 row-start-2">
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300 text-sm">
                            <thead className="bg-greyTable-main text-white-main">
                                <tr>
                                    <th className="border border-gray-light px-2 py-1 text-left">Disposition</th>
                                    <th className="border border-gray-light px-2 py-1 text-left">Start</th>
                                    <th className="border border-gray-light px-2 py-1 text-left">End</th>
                                    <th className="border border-gray-light px-2 py-1 text-left">Duration</th>
                                    <th className="border border-gray-light px-2 py-1 text-left">Status</th>

                                </tr>
                            </thead>
                            <tbody>
                                {x.disposition.map((item, index) => (
                                    <tr className='bg-greyTable-light text-black' key={index}>
                                        <td className='border border-gray-light px-2 py-1'>{item.description}</td>
                                        <td className='border border-gray-light px-2 py-1'>{item.start}</td>
                                        <td className='border border-gray-light px-2 py-1'>{item.end}</td>
                                        <td className='border border-gray-light px-2 py-1'>{item.duration}</td>
                                        <td className='border border-gray-light px-2 py-1'>{item.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row-span-4 col-start-5 row-start-2">4</div>
            </div>))}
    </div>
</>