export type medicalTeamTypes = {
    id: number;
    role: number;
    username: string;
    password: string;
};

export type salesTeamTypes = {
    id: number;
    role: number;
    proposal_no: string;
    username: string;

};

const roleMedicalTeam = {
    LinkingTeam: 1,
    EmailTeam: 2

}

export const medicalTeam: medicalTeamTypes[] = [
    { id: 1, role: roleMedicalTeam.LinkingTeam, username: "Deepika Lawrence", password: "123456" },
    { id: 2, role: roleMedicalTeam.LinkingTeam, username: "Ganesh Changle", password: "123456" },
    { id: 3, role: roleMedicalTeam.LinkingTeam, username: "Kartar Singh", password: "123456" },
    { id: 4, role: roleMedicalTeam.LinkingTeam, username: "Mandeep Rawat", password: "123456" },
    { id: 5, role: roleMedicalTeam.LinkingTeam, username: "Mahesh Mandavkar", password: "123456" },
    { id: 6, role: roleMedicalTeam.LinkingTeam, username: "Deepak Khurana", password: "123456" },
    { id: 7, role: roleMedicalTeam.EmailTeam, username: "Brij Mohan", password: "123456" },
    { id: 8, role: roleMedicalTeam.EmailTeam, username: "Hetal Rajput", password: "123456" },
    { id: 9, role: roleMedicalTeam.EmailTeam, username: "Virendra Yadav", password: "123456" },
    { id: 10, role: roleMedicalTeam.EmailTeam, username: "Harish Singh", password: "123456" },

];



export const salesTeam: salesTeamTypes[] = [
    { id: 1, role: 3, proposal_no: "1234", username: "Sales Portal" },
    { id: 2, role: 3, proposal_no: "12345", username: "Sales Portal" },
    { id: 3, role: 3, proposal_no: "123456", username: "Sales Portal" },

];
