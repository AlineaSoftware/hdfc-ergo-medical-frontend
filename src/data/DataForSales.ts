type InsuredDetails = {
    gender: string;
    age: string;
    dob: string;
    contact: string[];
    product: string;
    address: string;
    email: string;
    product_code:string;
    sum_insured:string;
    agent_name:string ,
    agent_mobile:string,
    agent_email:string,


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
    insuredDetails: InsuredDetails;
    disposition: Disposition[];
    product: string;
};

const HomeDataOfCaseForSalesTeleMER: ProposalData[] = [
    {
        id: 0,
        proposalNumber: '202406150077221',
        proposer: 'Sunil Harshad Mehta',
        insured: 'Sunil Harshad Mehta',
        requestTime: '12/06/24 09:30:00',
        requestId: '3606250',
        uniqueId: '9064801216351941',
        division: 'TUW',
        test: 'Cat 15',
        status: 'Closed',
        statusDateTime: '12/06/24 14:28:04',
        dc_name: "xyz",
        dc_address: "xyz",
        app_date: '12/06/24 14:28:04',
        product: 'OPTIMASECURE 15,00,000',
        insuredDetails: {
            gender: 'Male',
            age: '44 years',
            dob: '25/7/80',
            contact: ['9899013232', '8723415651'],
            product: 'OPTIMASECURE',
            address: '420 Gulmohar Society, 12 G. Deshmukh Marg, Kolhapur 416001, Maharashtra',
            email: 'ss796@daypey.com',
            product_code :"001",
            sum_insured:"15,00,000",
            agent_name:"Rahul Sharma" ,
            agent_mobile:"9948483833",
            agent_email:"xyz@gmail.com",
        },
        disposition: [
           
            { description: 'Report Uploaded', start: '25/06/24 15:14:32', duration: '00:01', status: 'Closed', comment: "Case cancelled due to out of TAT", callBackDate: '', tad: "7" },
            { description: 'Completed (For MIS)', start: '23/06/24 15:00:32', duration: '14:00', status: 'QC Approved', comment: "Client wants to cancel policy", callBackDate: '', tad: "3" },
            { description: 'Tele MER Complete', start: '22/06/24 14:58:00', duration: '01:40', status: 'Sent to QC', comment: "Auto confirmation status on confirm", callBackDate: '', tad: "4" },
            { description: 'Ringing But No Response Client', start: '20/06/24 14:53:46', duration: '01:10', status: 'Recall', comment: "Advisor not responding", callBackDate: '', tad: "3" },
            { description: 'Switched Off Client', start: '19/06/24 14:52:10', duration: '00:42', status: 'Recall', comment: "Not answering calls", callBackDate: '', tad: "3" },
            { description: 'Call Back Request By Client', start: '18/06/24 14:44:38', duration: '06:30', status: 'Recall', comment: "Call Back", callBackDate: '20/06/24 14:58:00', tad: "3" },
            { description: 'Client Have Some Issue With Policy', start: '17/06/24 14:37:17', duration: '03:01', status: 'Recall', comment: "Client will confirm later", callBackDate: '', tad: "4" },
            { description: 'Client Have Some Issue With Policy', start: '16/06/24 14:31:41', duration: '04:20', status: 'Recall', comment: "Client will confirm later", callBackDate: '', tad: "2" },
            { description: '', start: '15/06/24 13:57:30', duration: '00:00', status: 'Received', comment: "Client will confirm later", callBackDate: '', tad: "1" },
        ]
    },
    {
        id: 1,
        proposalNumber: '202406150077221',
        proposer: 'Sunil Harshad Mehta',
        insured: 'Arti Sunil Mehta',
        requestTime: '12/06/24 09:30:00',
        requestId: '3606251',
        uniqueId: '9064791216351941',
        division: 'TUW',
        test: 'Cat 15',
        status: 'Recall',
        statusDateTime: '12/06/24 14:29:32',
        dc_name: "xyz",
        dc_address: "xyz",
        app_date: '12/06/24 14:28:04',
        product: 'OPTIMASECURE 15,00,000',
        insuredDetails: {
            gender: 'Female',
            age: '40 years',
            dob: '15/8/84',
            contact: ['9899013232', '8723415651'],
            product: 'OPTIMASECURE',
            address: '420 Gulmohar Society, 12 G. Deshmukh Marg, Kolhapur 416001, Maharashtra',
            email: 'ss796@daypey.com',
            product_code :"001",
            sum_insured:"15,00,000",
            agent_name:"Rahul Sharma" ,
            agent_mobile:"9948483833",
            agent_email:"xyz@gmail.com",
        },
        disposition: [
            { description: 'Switched Off Client', start: '29/06/24 14:53:46', duration: '01:10', status: 'Recall', comment: "Client wants to cancel policy", callBackDate: '', tad: "3" },
            { description: 'Ringing But No Response Client', start: '27/06/24 14:52:10', duration: '00:42', status: 'Recall', comment: "Auto confirmation status on confirm", callBackDate: '', tad: "6" },
            { description: 'Not Reachable Client', start: '26/06/24 14:44:38', duration: '06:30', status: 'Recall', comment: "Advisor not responding", callBackDate: '', tad: "4" },
            { description: 'Client is Not Aware For Policy', start: '25/06/24 14:37:17', duration: '03:01', status: 'Recall', comment: "Not answering calls", callBackDate: '', tad: "3" },
            { description: 'Call Back Request By Client', start: '24/06/24 14:31:41', duration: '04:20', status: 'Recall', comment: "Call Back", callBackDate: '29/06/24 14:58:00', tad: "1" },
            { description: 'Client Have Some Issue With Policy', start: '22/06/24 14:25:18', duration: '04:51', status: 'Recall', comment: "Client will confirm later", callBackDate: '23/06/24 14:58:00', tad: "4" },
            { description: 'Incomplete Tele MER', start: '20/06/24 13:57:30', duration: '00:00', status: 'Recall', comment: "Client will confirm later", callBackDate: '', tad: "5" },
            { description: '', start: '19/06/24 13:57:30', duration: '00:00', status: 'Received', comment: "Client will confirm later", callBackDate: '20/06/24 14:58:00', tad: "6" },
            // { description: 'Tele MER Complete', start: '12/06/24 14:58:00', duration: '01:40', status: 'Sent to QC', comment: "Case cancelled due to out of TAT", callBackDate: '12/06/24 14:58:00', tad: "7" },
        ]
    }
];





export default HomeDataOfCaseForSalesTeleMER;