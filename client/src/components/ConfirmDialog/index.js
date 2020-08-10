import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmDialog = ({message, open, confirm, deny}) => {
	return (
		<Dialog
			open={open}
			onClose={deny}
		>
			<DialogTitle>Are you sure?</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{message}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={deny} color="primary">
					Cancel
				</Button>
				<Button onClick={confirm} color="primary" autoFocus>
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDialog;