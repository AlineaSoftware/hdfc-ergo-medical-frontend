
import { useState } from 'react';
import PPHCCasePage from './PPHCCasePage';
import PPHCCASEDetails2Page from './PPHCCasePage2';

type Props = {};

const PPHCCaseDePage = (props: Props) => {
    //Modal Open and Close
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<any>(undefined);
    const [selectedId, setSelectedId] = useState(0)

    //Modal changes function
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setType(undefined);
    };

    return (
        <>
            <PPHCCasePage
                handleOpen={handleOpen}
                setType={setType}
                open={open}
                type={type}
                handleClose={handleClose}
                setSelectedId={setSelectedId}
                selectedId={selectedId}
            />
            <PPHCCASEDetails2Page
                handleOpen={handleOpen}
                setType={setType}
                open={open}
                type={type}
                handleClose={handleClose}
                selectedId={selectedId}

            />
        </>

    );
};

export default PPHCCaseDePage;
