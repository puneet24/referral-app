import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { addReferral } from '../service';

export default function AddReferralDialog({ open, setOpen, showReferralSuccess, showReferralError }: any) {
    const [referEmail, setReferEmail] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const sendReferral = async () => {
        const addReferralResponse = await addReferral({ email: referEmail });
        if (addReferralResponse.success) {
            showReferralSuccess(addReferralResponse.message);
        } else {
            showReferralError(addReferralResponse.message)
        }
        handleClose();
    }

    return (
        <div>
            <Dialog maxWidth={"xs"} open={open} onClose={handleClose}>
                <DialogTitle>Invite</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To refer to somone, please enter referral email address here. We
                        will send referral link to provided email address.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={(e) => { setReferEmail(e.target.value) }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={sendReferral}>Send Referral</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}