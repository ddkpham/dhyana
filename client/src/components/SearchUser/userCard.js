import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ProfilePage from "../ProfilePage/index";

function UserCard(props) {
	const { user: {username, first_name, last_name} } = props;
	return (
		<Card raised>
			<CardActionArea href={"/user/" + username}>
				<CardContent>
					<Typography variant="h5" color="textSecondary" gutterBottom>{username}</Typography>
					<Typography variant="body1">{first_name} {last_name}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default UserCard;
