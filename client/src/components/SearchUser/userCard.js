import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function UserCard(props) {
	const { user: {username, first_name, last_name} } = props;
	return (
		<div>
			<Card raised >
				<CardActionArea href={"/user/" + username}>
					<CardContent>
						<Typography style={{overflowX: "scroll"}} variant="h5" color="textSecondary">{username}</Typography>
						<Typography style={{overflowX: "scroll"}} variant="body1">{first_name} {last_name}</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</div>
	);
}

export default UserCard;
