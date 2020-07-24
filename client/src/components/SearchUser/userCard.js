import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function UserCard(props) {
	const { user: {username, fName, lName} } = props;
	return (
		<Card raised>
			<CardActionArea href={"/user/" + fName}>
				<CardContent>
					<Typography variant="h5" color="textSecondary" gutterBottom>{username}</Typography>
					<Typography variant="body1">{fName}</Typography>
                    <Typography variant="body1">{lName}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default UserCard;
