




type InsuredDetails = {
    gender: string;
    age: string;
    dob: string;
    contact: string[];
    product: string;
    address: string;
    email: string;
    product_code:string
    sum_insured:string;
    agent_name:string ,
    agent_mobile:string,
    agent_email:string

};

type Disposition = {
    description: string;
    start: string;
    duration: string;
    status: string;
    comment: string;
    callBackDate: string;
    tad: string
};

type ProposalData = {
    id: number;
    proposalNumber: string;
    proposer: string;
    insured: string;
    requestTime: string;
    requestId: string;
    uniqueId: string;
    division: string;
    test: string;
    status: string;
    statusDateTime: string;
    dc_name: string;
    dc_address: string;
    app_date: string;
    visit_type:string
    insuredDetails: InsuredDetails;
    disposition: Disposition[];
};

const DcDetailsPPHC: ProposalData[] = [
    {
        id: 0,
        proposalNumber: '202406150077221',
        proposer: 'Aravind Shrnivasan',
        insured: 'Aravind Shrnivasan',
        requestTime: '12/06/24 09:30:00',
        requestId: '3606250',
        uniqueId: '9064801216351941',
        division: 'PPHC',
        test: 'Cat 7',
        status: 'Closed',
        statusDateTime: '12/06/24 14:28:04',
        dc_name: "AGARTALA DIAGNOSTIC CENTRE",
        dc_address: "Flat No. 502, Sunshine Apartments,LBS Marg,Malad West,Mumbai - 400080, Maharashtra, India.",
        app_date: '12/06/24 14:28:04',
        visit_type:"DC",
        insuredDetails: {
            gender: 'Male',
            age: '44 years',
            dob: '25/7/80',
            contact: ['9899013232', '8723415651'],
            product: 'OPTIMASECURE',
            address: '420 Gulmohar Society, 12 G. Deshmukh Marg, Kolhapur 416001, Maharashtra',
            email: 'ss796@daypey.com',
            product_code :"002",
            sum_insured:"15,00,000",
            agent_name:"Rahul Sharma" ,
            agent_mobile:"9948483833",
            agent_email:"xyz@gmail.com"
        },
        disposition: [
            {
                description: "Report Uploaded",
                start: "30/06/24 17:35:00",
                duration: "04:00",
                status: "Closed",
                comment: "Report Uploaded",
                callBackDate: '',
                tad: "7"
            },
            {
                description: "Call Back Request By Client",
                start: "29/05/24 17:05:00",
                duration: "04:00",
                status: "Insurer actionable",
                comment: "Call Back",
                callBackDate: '21/06/24 14:58:00',
                tad: "8"
            },
            {
                description: "Call Back Request By Client",
                start: "27/05/24 16:30:00",
                duration: "04:00",
                status: "Recall",
                comment: "Call Back",
                callBackDate: '20/06/24 14:58:00',
                tad: "5"
            },
            {
                description: "Call Back Request By Client",
                start: "22/05/24 19:30:00",
                duration: "00:10",
                status: "Recall",
                comment: "Call Back",
                callBackDate: '19/06/24 14:58:00',
                tad: "6"
            },
            {
                description: "Ringing But No Response-Client",
                start: "20/05/24 19:10:00",
                duration: "04:00",
                status: "Recall",
                comment: "Not answering calls",
                callBackDate: '',
                tad: "5"
            },
            {
                description: "Call Back Request By Client",
                start: "18/05/24 18:30:00",
                duration: "02:00",
                status: "Recall",
                comment: "Call Back",
                callBackDate: '18/06/24 14:58:00',
                tad: "3"
            },
            {
                description: "Client is out of Station or Country",
                start: "17/05/24 18:00:00",
                duration: "02:00",
                status: "Recall",
                comment: "Client will confirm later",
                callBackDate: '',
                tad: "2"
            },
            {
                description: "Client is Not Aware For Policy",
                start: "16/05/24 17:30:00",
                duration: "03:00",
                status: "Recall",
                comment: "Client will confirm later",
                callBackDate: '',
                tad: "1"
            },
            {
                description: "Client Have Some Issue With Policy",
                start: "15/05/24 17:00:00",
                duration: "03:00",
                status: "Recall",
                comment: "Client will confirm later",
                callBackDate: '',
                tad: "7"
            }
        ]
    },
    {
        id: 1,
        proposalNumber: '202406150077221',
        proposer: 'Aravind Shrnivasan',
        insured: 'Premila Aravind',
        requestTime: '12/06/24 09:30:00',
        requestId: '3606251',
        uniqueId: '9064791216351941',
        division: 'PPHC',
        test: 'Cat 8',
        status: 'Recall',
        statusDateTime: '12/06/24 14:29:32',
        dc_name: "Bliss clinic",
        dc_address: "B-201, Oberoi Gardens,Lokhandwala Complex,Andheri West,Mumbai - 400053, Maharashtra, India.",
        app_date: '12/06/24 14:28:04',
        visit_type:"Home",
        insuredDetails: {
            gender: 'Female',
            age: '40 years',
            dob: '15/8/84',
            contact: ['9899013232', '8723415651'],
            product: 'OPTIMASECURE',
            address: '420 Gulmohar Society, 12 G. Deshmukh Marg, Kolhapur 416001, Maharashtra',
            email: 'ss796@daypey.com',
            product_code :"002",
            sum_insured:"15,00,000",
            agent_name:"Rahul Sharma" ,
            agent_mobile:"9948483833",
            agent_email:"xyz@gmail.com"
        },
        disposition: [
            {
                description: "Ringing But No Response Client",
                start: "29/06/24 17:35:00",
                duration: "04:00",
                status: "Recall",
                comment: "Ringing But No Response Client",
                callBackDate: '',
                tad: "7"
            },
            {
                description: "Client confirmed medical already done",
                start: "29/06/24 17:05:00",
                duration: "04:00",
                status: "Insurer actionable",
                comment: "Client confirmed medical already done",
                callBackDate: '',
                tad: "3"
            },
            {
                description: "Not Reachable Client",
                start: "28/06/24 16:30:00",
                duration: "04:00",
                status: "Recall",
                comment: "Not Reachable Client",
                callBackDate: '',
                tad: "1"
            },
            {
                description: "Client is Not Aware For Medical",
                start: "27/06/24 19:30:00",
                duration: "00:10",
                status: "Recall",
                comment: "Client is Not Aware For Medical",
                callBackDate: '',
                tad: "2"
            },
            {
                description: "Client is out of Station or Country",
                start: "26/06/24 19:10:00",
                duration: "04:00",
                status: "Recall",
                comment: "Not answering calls",
                callBackDate: '',
                tad: "3"
            },
            {
                description: "Call Back Request By Client",
                start: "22/06/24 18:30:00",
                duration: "02:00",
                status: "Recall",
                comment: "Call Back",
                callBackDate: '24/06/24 14:58:00',
                tad: "3"
            },
            {
                description: "Client is Not Aware For Policy",
                start: "19/06/24 18:00:00",
                duration: "02:00",
                status: "Recall",
                comment: "Client will confirm later",
                callBackDate: '',
                tad: "6"
            },
            {
                description: "Client is not interested for Medical",
                start: "18/06/24 17:30:00",
                duration: "03:00",
                status: "Recall",
                comment: "Client will confirm later",
                callBackDate: '',
                tad: "9"
            },
            {
                description: "Client Have Some Issue With Policy",
                start: "01/06/24 17:00:00",
                duration: "03:00",
                status: "Recall",
                comment: "Client will confirm later",
                callBackDate: '',
                tad: "7"
            }
        ]
    }
];


export default DcDetailsPPHC;