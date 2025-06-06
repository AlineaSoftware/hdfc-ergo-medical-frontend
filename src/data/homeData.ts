// Define a type for the data objects
export type RequestData = {
    id: number;
    requestTime: string;
    requestId: string;
    proposalNo: string;
    uniqueId: string;
    proposer: string;
    insured: string;
    division: string;
    tests: string;
    currentStatus: string;
    mobileNo: string;
    tat:string
}

// Dummy data array
const homePageData: RequestData[] = [
    {
        id: 1,
        requestTime: "12/06/24 09:30:00",
        requestId: "3606250",
        proposalNo: "20240615007221",
        uniqueId: "90648021635941",
        proposer: "Sunil Harshad Mehta",
        insured: "Sunil Harshad Mehta",
        division: "TUW",
        tests: "Cat 15",
        currentStatus: "Closed",
        mobileNo: "******4040 / ******2921",
        tat:"7"
    },
    {
        id: 2,
        requestTime: "12/06/24 09:30:00",
        requestId: "3606251",
        proposalNo: "20240615007221",
        uniqueId: "90647921635941",
        proposer: "Sunil Harshad Mehta",
        insured: "Arti Sunil Mehta",
        division: "TUW",
        tests: "Cat 15",
        currentStatus: "Recall",
        mobileNo: "******2721 / ******2922",
        tat:"6"
    },
    {
        id: 3,
        requestTime: "12/06/24 12:30:45",
        requestId: "3606393",
        proposalNo: "20240625007258I",
        uniqueId: "909945187351541",
        proposer: "Aravind Srinivasan",
        insured: "Aravind Srinivasan",
        division: "PPHC",
        tests: "Cat 7",
        currentStatus: "Closed",
        mobileNo: "******3532 / ******2943",
        tat:"3"
    },
    {
        id: 4,
        requestTime: "12/06/24 12:30:45",
        requestId: "3606394",
        proposalNo: "20240625007258I",
        uniqueId: "909941871351541",
        proposer: "Aravind Srinivasan",
        insured: "Premila Aravind",
        division: "PPHC",
        tests: "Cat 8",
        currentStatus: "Recall",
        mobileNo: "******4044 / ******2933",
        tat:"5"
    },
    {
        id: 5,
        requestTime: "10/10/24 14:45:30",
        requestId: "3606512",
        proposalNo: "20240611008234",
        uniqueId: "90845621378954",
        proposer: "Rajesh Kumar",
        insured: "Rajesh Kumar",
        division: "PPHC",
        tests: "Cat 10",
        currentStatus: "Under Review",
        mobileNo: "******4045 / ******2924",
        tat:"4"
    },
    {
        id: 6,
        requestTime: "10/09/24 11:20:15",
        requestId: "3606513",
        proposalNo: "20240611008235",
        uniqueId: "90845621738954",
        proposer: "Ravi Prakash",
        insured: "Ravi Prakash",
        division: "TUW",
        tests: "Cat 15",
        currentStatus: "Approved",
        mobileNo: "******4055 / ******2922",
        tat:"5"
    },
    {
        id: 7,
        requestTime: "09/08/24 15:00:00",
        requestId: "3606621",
        proposalNo: "20240613009245",
        uniqueId: "90712341678923",
        proposer: "Sneha Patil",
        insured: "Sneha Patil",
        division: "PPHC",
        tests: "Cat 8",
        currentStatus: "Sent to Insurer",
        mobileNo: "******4060 / ******2925",
        tat:"7"
    },
    {
        id: 8,
        requestTime: "08/06/24 10:50:30",
        requestId: "3606622",
        proposalNo: "20240613009246",
        uniqueId: "90712341788923",
        proposer: "Amit Sharma",
        insured: "Amit Sharma",
        division: "PPHC",
        tests: "Cat 5",
        currentStatus: "Pending Documentation",
        mobileNo: "******4040 / ******2977",
        tat:"3"
    },
    {
        id: 9,
        requestTime: "07/05/24 13:25:40",
        requestId: "3606731",
        proposalNo: "20240617010251",
        uniqueId: "90685421778961",
        proposer: "Priya Nair",
        insured: "Priya Nair",
        division: "TUW",
        tests: "Cat 15",
        currentStatus: "Finalized",
        mobileNo: "******4045 / ******2955",
        tat:"5"
    },
    {
        id: 10,
        requestTime: "06/04/24 16:15:55",
        requestId: "3606732",
        proposalNo: "20240617010252",
        uniqueId: "90685421778962",
        proposer: "Anil Kapoor",
        insured: "Anil Kapoor",
        division: "TUW",
        tests: "Cat 15",
        currentStatus: "Sent to Client",
        mobileNo: "******4033 / ******2960",
        tat:"3"
    },

];


export default homePageData;
