import { Button, Container } from "@mui/material";
import { useState } from "react";
import AddReferralDialog from "../components/AddReferralDialog";
import ReferralTable from "../components/ReferralTable";
import Store from "./../store";

export const HomePage = ({ setGlobalSnack }: any) => {
    const store = Store.getStore();
    const user = store?.user;
    const [referralDialogOpen, setReferralDialogOpen] = useState(false);

    const showReferralSuccess = (message: string) => {
        setReferralDialogOpen(false);
        setGlobalSnack({ open: true, message: message, error: false });
    }

    const showReferralError = (message: string) => {
        setReferralDialogOpen(false);
        setGlobalSnack({ open: true, message: message, error: true });
    }

    return (
        <Container style={{ marginTop: 50, padding: 50 }}>
            <Button style={{ float: "right", marginBottom: 20 }} variant="contained" onClick={() => { setReferralDialogOpen(true) }}>Add Referral</Button>
            {user?.referrals && <ReferralTable data={user.referrals}></ReferralTable>}
            <AddReferralDialog open={referralDialogOpen} setOpen={setReferralDialogOpen} showReferralSuccess={showReferralSuccess} showReferralError={showReferralError}></AddReferralDialog>
        </Container>
    )
}