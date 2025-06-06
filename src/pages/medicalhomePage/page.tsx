
import { useState } from 'react';
import MedicalHomePage from './MedicalHomePage';

type Props = {};

const MedicalPage = (props: Props) => {
    //Modal Open and Close
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<any>(undefined);

    //Modal changes function
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setType(undefined);
    };

    return (
        <MedicalHomePage
            handleOpen={handleOpen}
            setType={setType}
            open={open}
            type={type}
            handleClose={handleClose}
        />
    );
};

export default MedicalPage;
